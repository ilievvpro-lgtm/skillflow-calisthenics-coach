import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { buildCoachInstructions } from "@/lib/coach-prompt";

// Provider selection (server-only env vars, never sent to the browser):
// - ANTHROPIC_API_KEY set  -> call Anthropic directly (your monthly API credits).
// - otherwise              -> Vercel AI Gateway (AI_GATEWAY_API_KEY locally, or the
//                             OIDC token Vercel injects automatically on deploy).
const ANTHROPIC_MODEL = process.env["ANTHROPIC_MODEL"] || "claude-opus-5-5";
const GATEWAY_MODEL = process.env["AI_GATEWAY_MODEL"] || "anthropic/claude-opus-5.5";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
});

type ChatMessage = z.infer<typeof bodySchema>["messages"][number];

const MESSAGES = {
  rateLimit: "Твърде много въпроси наведнъж – изчакай малко.",
  unavailable: "AI треньорът е временно недостъпен.",
  generic: "Нещо се обърка. Опитай пак.",
  refusal: "Не мога да отговоря на това. Попитай за тренировките си.",
  dropped: "\n\n⚠️ Връзката прекъсна. Опитай пак.",
};

function errorResponse(status: number) {
  const error =
    status === 429
      ? MESSAGES.rateLimit
      : status === 401 || status === 402 || status === 403
        ? MESSAGES.unavailable
        : MESSAGES.generic;
  return Response.json({ error }, { status: status >= 400 && status < 600 ? status : 500 });
}

function statusOf(err: unknown): number {
  if (err && typeof err === "object") {
    for (const key of ["status", "statusCode"] as const) {
      const value = (err as Record<string, unknown>)[key];
      if (typeof value === "number") return value;
    }
  }
  return 500;
}

/**
 * Turns an async iterator of text chunks into a plain-text Response. The first
 * chunk is awaited before responding, so auth/quota errors become a JSON error
 * with a real status instead of a half-open stream.
 */
async function textResponse(chunks: AsyncIterator<string>): Promise<Response> {
  const first = await chunks.next();
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (!first.done) controller.enqueue(encoder.encode(first.value));
        for (let next = await chunks.next(); !next.done; next = await chunks.next()) {
          controller.enqueue(encoder.encode(next.value));
        }
      } catch (err) {
        console.error("coach stream error", err);
        controller.enqueue(encoder.encode(MESSAGES.dropped));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

async function* anthropicChunks(
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  const stream = client.beta.messages.stream(
    {
      model: ANTHROPIC_MODEL,
      max_tokens: 8000,
      system: [
        { type: "text", text: buildCoachInstructions(), cache_control: { type: "ephemeral" } },
      ],
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      messages,
    },
    { signal },
  );
  let wroteText = false;
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      wroteText = true;
      yield event.delta.text;
    } else if (event.type === "message_delta" && event.delta.stop_reason === "refusal") {
      yield wroteText ? `\n\n${MESSAGES.refusal}` : MESSAGES.refusal;
    }
  }
}

async function* gatewayChunks(
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string> {
  const { streamText, gateway } = await import("ai");
  const result = streamText({
    model: gateway(GATEWAY_MODEL),
    system: buildCoachInstructions(),
    messages,
    abortSignal: signal,
  });
  // fullStream surfaces provider errors (textStream would swallow them).
  for await (const part of result.fullStream) {
    if (part.type === "text-delta") yield part.text;
    else if (part.type === "error") throw part.error;
  }
}

export const Route = createFileRoute("/api/coach")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ error: "Невалидна заявка." }, { status: 400 });
        }
        const { messages } = parsed.data;
        try {
          const chunks = process.env["ANTHROPIC_API_KEY"]
            ? anthropicChunks(messages, request.signal)
            : gatewayChunks(messages, request.signal);
          return await textResponse(chunks);
        } catch (err) {
          console.error("coach error", err);
          return errorResponse(statusOf(err));
        }
      },
    },
  },
});

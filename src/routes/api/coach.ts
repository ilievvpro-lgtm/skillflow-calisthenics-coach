import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { buildCoachInstructions } from "@/lib/coach-prompt";

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

export const Route = createFileRoute("/api/coach")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ error: "Невалидна заявка." }, { status: 400 });
        }
        const { streamResponse, GatewayError } = await import("@lovable.dev/ai-gateway");

        const input = parsed.data.messages.map((m) =>
          m.role === "user"
            ? { role: "user" as const, content: m.content }
            : { role: "assistant" as const, content: [{ type: "output_text" as const, text: m.content }] },
        );

        try {
          const stream = await streamResponse(
            {
              model: "openai/gpt-6-astra",
              instructions: buildCoachInstructions(),
              input,
            },
            { signal: request.signal },
          );

          const encoder = new TextEncoder();
          const body = new ReadableStream<Uint8Array>({
            async start(controller) {
              try {
                for await (const event of stream) {
                  if (event.type === "response.output_text.delta") {
                    controller.enqueue(encoder.encode(event.delta));
                  }
                }
              } catch (err) {
                console.error("coach stream error", err);
                controller.enqueue(encoder.encode("\n\n⚠️ Връзката прекъсна. Опитай пак."));
              } finally {
                controller.close();
              }
            },
          });

          return new Response(body, {
            headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
          });
        } catch (err) {
          console.error("coach error", err);
          const status = err instanceof GatewayError && err.httpStatus ? err.httpStatus : 500;
          const message =
            status === 429
              ? "Твърде много въпроси наведнъж – изчакай малко."
              : status === 402
                ? "AI треньорът е временно недостъпен."
                : "Нещо се обърка. Опитай пак.";
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});

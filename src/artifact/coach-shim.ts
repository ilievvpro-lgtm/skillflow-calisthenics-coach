// In the Claude Artifact build there is no server, so `/api/coach` requests are answered
// by Claude through the artifact's `sample` capability (no API key needed).
import { buildCoachInstructions } from "@/lib/coach-prompt";

type ChatMessage = { role: "user" | "assistant"; content: string };
type SampleFn = (
  input: ChatMessage[],
  opts: { onText?: (e: { text: string }) => void; signal?: AbortSignal; cache?: boolean },
) => Promise<{ text: string }>;
type ClaudeRuntime = { use?: (name: string) => Promise<unknown> };

const UNAVAILABLE = "AI треньорът работи, когато приложението е отворено в Claude.";
const ERRORS: Record<string, string> = {
  not_granted: "AI треньорът няма разрешение. Разреши го от менюто Permissions на страницата.",
  rate_limited: "Твърде много въпроси наведнъж – изчакай малко.",
};

let samplePromise: Promise<SampleFn | null> | undefined;
function getSample(): Promise<SampleFn | null> {
  const claude = (window as unknown as { claude?: ClaudeRuntime }).claude;
  samplePromise ??= claude?.use
    ? (claude.use("sample") as Promise<SampleFn | null>).catch(() => null)
    : Promise.resolve(null);
  return samplePromise;
}

async function answer(init: RequestInit | undefined): Promise<Response> {
  const sample = await getSample();
  if (!sample) return Response.json({ error: UNAVAILABLE }, { status: 503 });

  const { messages } = JSON.parse(String(init?.body ?? "{}")) as { messages: ChatMessage[] };
  // sample() is memoryless and has no system field: put the coach rules in the first turn.
  const input = messages.map((m, i) =>
    i === 0 && m.role === "user"
      ? { ...m, content: `${buildCoachInstructions()}\n\n---\n\n${m.content}` }
      : m,
  );

  const encoder = new TextEncoder();
  let sent = 0;
  let controllerRef: ReadableStreamDefaultController<Uint8Array> | undefined;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller;
    },
  });
  const push = (text: string) => {
    if (text.length > sent) {
      controllerRef?.enqueue(encoder.encode(text.slice(sent)));
      sent = text.length;
    }
  };

  const run = sample(input, {
    cache: false,
    ...(init?.signal ? { signal: init.signal } : {}),
    onText: ({ text }) => push(text),
  });

  // Wait for the first words (or an error) so errors still arrive as JSON.
  const first = await Promise.race([
    run.then(
      (r) => ({ ok: true as const, r }),
      (e: unknown) => ({ ok: false as const, e }),
    ),
    new Promise<null>((resolve) => {
      const tick = () => (sent > 0 ? resolve(null) : setTimeout(tick, 50));
      tick();
    }),
  ]);
  if (first && !first.ok) {
    const code = (first.e as { code?: string })?.code ?? "";
    return Response.json({ error: ERRORS[code] ?? "Нещо се обърка. Опитай пак." }, { status: 500 });
  }

  run
    .then((r) => push(r.text))
    .catch(() => controllerRef?.enqueue(encoder.encode("\n\n⚠️ Връзката прекъсна. Опитай пак.")))
    .finally(() => controllerRef?.close());

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

export function installCoachShim() {
  const realFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    return url.endsWith("/api/coach") ? answer(init) : realFetch(input, init);
  };
}

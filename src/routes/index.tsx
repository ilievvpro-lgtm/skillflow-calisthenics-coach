import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Bot, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { RichText } from "@/components/app/RichText";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Coach – BAR SKILLS" },
      {
        name: "description",
        content: "Питай AI треньора за калистеника: план, техника и кой скил да тренираш сега.",
      },
      { property: "og:title", content: "AI Coach – BAR SKILLS" },
      {
        property: "og:description",
        content: "Питай AI треньора за калистеника: план, техника и кой скил да тренираш сега.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoachPage,
});

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Мога 5 набирания. Как да стигна до muscle-up?",
  "Направи ми план за 3 дни седмично",
  "Защо падам назад при стойка на ръце?",
  "С какво да започна, ако съм пълен начинаещ?",
];

function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setError(null);
    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-20) }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Нещо се обърка. Опитай пак.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("Треньорът не отговори. Опитай пак.");
    } catch (e) {
      setMessages(history);
      setInput(content);
      setError(e instanceof Error ? e.message : "Нещо се обърка.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const empty = messages.length === 0;

  return (
    <div className="flex min-h-[calc(100dvh-6.5rem)] flex-col">
      <header className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-2.5">
          <div className="grid size-10 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Bot className="size-5" />
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-none tracking-tight">
              {brand.appName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">AI Coach · онлайн</p>
          </div>
        </div>
        {!empty && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Нов разговор"
            onClick={() => {
              setMessages([]);
              setError(null);
            }}
          >
            <RotateCcw />
          </Button>
        )}
      </header>

      <div className="flex-1 px-5">
        {empty ? (
          <div className="animate-rise pt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              AI помощник
            </p>
            <h1 className="mt-3 text-[2.1rem] font-bold leading-[1.02]">
              Твоят треньор <span className="text-gradient-primary">на лоста</span>, 24/7.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Кажи ми какво можеш сега и към кой скил гониш – ще ти кажа откъде да започнеш и какво
              да тренираш.
            </p>
            <div className="mt-8 grid gap-2.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="rounded-2xl border border-border bg-card/70 px-4 py-3.5 text-left text-sm text-foreground shadow-card transition-colors hover:border-primary/60 hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ol className="space-y-4 py-6">
            {messages.map((m, i) => (
              <li key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-3xl rounded-br-md bg-gradient-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                      : "max-w-[92%] rounded-3xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm leading-relaxed text-card-foreground shadow-card"
                  }
                >
                  {m.role === "assistant" && !m.content ? (
                    <span className="flex gap-1 py-1" aria-label="Пише...">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="size-2 animate-pulse-dot rounded-full bg-primary"
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </span>
                  ) : m.role === "assistant" ? (
                    <RichText text={m.content} />
                  ) : (
                    m.content
                  )}
                </div>
              </li>
            ))}
            <div ref={endRef} />
          </ol>
        )}
      </div>

      <div className="sticky bottom-[calc(6.5rem+env(safe-area-inset-bottom))] px-4 pt-3">
        {error && (
          <p
            role="alert"
            className="mb-2 rounded-xl bg-destructive/15 px-3 py-2 text-xs text-destructive"
          >
            {error}
          </p>
        )}
        <form
          onSubmit={onSubmit}
          className="flex items-end gap-2 rounded-3xl border border-border bg-card/90 p-2 shadow-card backdrop-blur-xl"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder="Питай треньора..."
            aria-label="Съобщение до треньора"
            className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Button
            type="submit"
            variant="hero"
            size="icon"
            className="size-10 rounded-2xl"
            disabled={loading || !input.trim()}
            aria-label="Изпрати"
          >
            <ArrowUp />
          </Button>
        </form>
      </div>
    </div>
  );
}

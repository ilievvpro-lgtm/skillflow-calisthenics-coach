import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Bot, Camera, Plus, RotateCcw, Video, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { RichText } from "@/components/app/RichText";
import { Button } from "@/components/ui/button";
import { imageToDataUrl, videoToFrames } from "@/lib/media-frames";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Coach Calix – CALISTHIC AI Coach" },
      {
        name: "description",
        content: "Ask your calisthenics AI coach about training plans, technique and your next skill.",
      },
      { property: "og:title", content: "Coach Calix – CALISTHIC AI Coach" },
      {
        property: "og:description",
        content: "Ask your calisthenics AI coach about training plans, technique and your next skill.",
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
  images?: string[];
  mediaLabel?: string;
}

const suggestions = [
  "I can do 5 pull-ups. How do I get to a muscle-up?",
  "Build me a 3-day weekly training plan",
  "Why do I fall backward in a handstand?",
  "Where should I start as a complete beginner?",
];

function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachment, setAttachment] = useState<{ images: string[]; label: string } | null>(null);
  const [preparing, setPreparing] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);

  async function onPick(file: File | undefined, kind: "image" | "video") {
    if (!file) return;
    setError(null);
    setPreparing(true);
    try {
      if (kind === "video") {
        if (file.size > 200 * 1024 * 1024) throw new Error("Video is too large. Use a clip under 200 MB.");
        const frames = await videoToFrames(file);
        setAttachment({ images: frames, label: `Video · ${file.name}` });
      } else {
        setAttachment({ images: [await imageToDataUrl(file)], label: `Photo · ${file.name}` });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read that file.");
    } finally {
      setPreparing(false);
    }
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(text: string) {
    const media = attachment;
    const content =
      text.trim() || (media ? "Analyse my form: what am I doing wrong, how do I fix it step by step, and what progression should I follow?" : "");
    if (!content || loading || preparing) return;
    setError(null);
    const userMsg: ChatMessage = media
      ? { role: "user", content, images: media.images, mediaLabel: media.label }
      : { role: "user", content };
    const history: ChatMessage[] = [...messages, userMsg];
    setAttachment(null);
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          // Only the newest message carries media, keeping requests small.
          messages: history.slice(-20).map((m, i, arr) =>
            i === arr.length - 1 && m.images
              ? { role: m.role, content: m.content, images: m.images }
              : { role: m.role, content: m.content },
          ),
        }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
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
      if (!acc.trim()) throw new Error("The coach did not respond. Please try again.");
    } catch (e) {
      setMessages(messages);
      setInput(text);
      setAttachment(media);
      setError(e instanceof Error ? e.message : "Something went wrong.");
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
    <div className="mx-auto flex min-h-[calc(100dvh-5rem)] flex-col">
      <header className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-2.5">
          <div className="grid size-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Bot className="size-5" />
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-none tracking-normal">Coach Calix</p>
            <p className="mt-1 text-xs text-muted-foreground">AI Coach · Online</p>
          </div>
        </div>
        {!empty && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="New conversation"
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
          <div className="animate-rise pt-8">
            <p className="text-xs font-semibold uppercase tracking-normal text-primary">AI assistant</p>
            <h1 className="mt-3 text-[2.1rem] font-bold leading-[1.02]">
              Hi, I'm <span className="text-gradient-primary">Coach Calix</span>.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Upload a video or photo of your exercise from your gallery. I'll show you what's wrong,
              how to fix it step by step, and the progression to master the skill.
            </p>
            <div className="mt-8 grid gap-2.5">
              {suggestions.map((s) => (
                <Button
                  variant="outline"
                  key={s}
                  type="button"
                  onClick={() => void send(s)}
                  className="h-auto justify-start whitespace-normal rounded-lg border border-border bg-card/70 px-4 py-3.5 text-left text-sm text-foreground shadow-card transition-colors hover:border-primary/60 hover:bg-accent"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <ol className="space-y-4 py-6">
            {messages.map((m, i) => (
              <li
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-lg rounded-br-md bg-gradient-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                      : "max-w-[92%] rounded-lg rounded-bl-md border border-border bg-card px-4 py-3 text-sm leading-relaxed text-card-foreground shadow-card"
                  }
                >
                  {m.role === "assistant" && !m.content ? (
                    <span className="flex gap-1 py-1" aria-label="Thinking…">
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
                    <>
                      {m.images?.length ? (
                        <div className="mb-2 flex gap-1 overflow-x-auto">
                          {m.images.slice(0, 4).map((src, j) => (
                            <img key={j} src={src} alt="" className="h-16 w-12 shrink-0 rounded object-cover" />
                          ))}
                        </div>
                      ) : null}
                      {m.mediaLabel && <p className="mb-1 text-xs opacity-80">{m.mediaLabel}</p>}
                      {m.content}
                    </>
                  )}
                </div>
              </li>
            ))}
            <div ref={endRef} />
          </ol>
        )}
      </div>

      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] px-4 pt-3">
        {error && (
          <p role="alert" className="mb-2 rounded-md bg-destructive/15 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
        <input ref={imageInput} type="file" accept="image/*" hidden onChange={(e) => { void onPick(e.target.files?.[0], "image"); e.target.value = ""; }} />
        <input ref={videoInput} type="file" accept="video/*" hidden onChange={(e) => { void onPick(e.target.files?.[0], "video"); e.target.value = ""; }} />
        {(attachment || preparing) && (
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-primary/40 bg-card p-2 shadow-card">
            {preparing ? (
              <p className="flex-1 px-1 text-sm text-muted-foreground">Preparing your media…</p>
            ) : attachment ? (
              <>
                <img src={attachment.images[0]} alt="Selected media preview" className="size-12 rounded object-cover" />
                <p className="flex-1 truncate text-sm">{attachment.label}</p>
                <Button type="button" variant="ghost" size="icon" aria-label="Remove attachment" onClick={() => setAttachment(null)}>
                  <X />
                </Button>
              </>
            ) : null}
          </div>
        )}
        {menuOpen && (
          <div className="mb-2 grid grid-cols-2 gap-2 rounded-lg border border-border bg-card p-2 shadow-card">
            {[
              { label: "Video", icon: Video, ref: videoInput },
              { label: "Photo", icon: Camera, ref: imageInput },
            ].map(({ label, icon: Icon, ref }) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                onClick={() => {
                  setMenuOpen(false);
                  ref.current?.click();
                }}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary"
              >
                <Icon className="size-4 text-primary" /> {label}
              </Button>
            ))}
          </div>
        )}
        <form
          onSubmit={onSubmit}
          className="flex items-end gap-2 rounded-lg border border-border bg-card/90 p-2 shadow-card backdrop-blur-xl"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-lg"
            aria-label="Add a video or photo"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Plus />
          </Button>
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
            placeholder={attachment ? "Which skill is this? (optional)" : "Ask Coach Calix…"}
            aria-label="Message your coach"
            className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Button
            type="submit"
            variant="hero"
            size="icon"
            className="size-10 rounded-lg"
            disabled={loading || preparing || (!input.trim() && !attachment)}
            aria-label="Send"
          >
            <ArrowUp />
          </Button>
        </form>
      </div>
    </div>
  );
}

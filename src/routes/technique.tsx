import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Play, X } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/app/PageHeader";
import { skills, type Skill } from "@/data/skills";
import { techniqueVideos } from "@/data/videos";

export const Route = createFileRoute("/technique")({
  head: () => ({
    meta: [
      { title: "Видео уроци: грешно и правилно – BAR SKILLS" },
      {
        name: "description",
        content: "Виж всеки скил изпълнен грешно и правилно – и разбери разликата за секунди.",
      },
      { property: "og:title", content: "Видео уроци: грешно и правилно – BAR SKILLS" },
      {
        property: "og:description",
        content: "Виж всеки скил изпълнен грешно и правилно – и разбери разликата за секунди.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TechniquePage,
});

function VideoSlot({ kind, src, skill }: { kind: "wrong" | "right"; src: string | undefined; skill: Skill }) {
  const isWrong = kind === "wrong";
  return (
    <article
      className={`overflow-hidden rounded-3xl border bg-card shadow-card ${isWrong ? "border-destructive/40" : "border-success/40"}`}
    >
      <div className="relative aspect-[4/5] bg-muted">
        {src ? (
          <video src={src} controls playsInline loop className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <span className="grid size-14 place-items-center rounded-full border border-border bg-background/60">
                <Play className="size-6" />
              </span>
              <span className="text-xs">Видеото идва скоро</span>
            </div>
          </div>
        )}
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${isWrong ? "bg-destructive text-destructive-foreground" : "bg-success text-success-foreground"}`}
        >
          {isWrong ? <X className="size-3.5" /> : <Check className="size-3.5" />}
          {isWrong ? "Грешно" : "Правилно"}
        </span>
      </div>
      <p className="p-4 text-sm leading-relaxed text-card-foreground">{isWrong ? skill.wrong : skill.right}</p>
    </article>
  );
}

function TechniquePage() {
  const [slug, setSlug] = useState(skills[0]?.slug ?? "");
  const skill = skills.find((s) => s.slug === slug) ?? skills[0];
  if (!skill) return null;
  const videos = techniqueVideos[skill.slug] ?? {};

  return (
    <div>
      <PageHeader eyebrow="Technique · Видео уроци" title={<>Грешно vs. правилно</>}>
        Аз изпълнявам всеки скил двойно – с най-честата грешка и с чиста техника.
      </PageHeader>

      <div className="no-scrollbar -mt-1 flex gap-2 overflow-x-auto px-5 pb-4" role="tablist">
        {skills.map((s) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={s.slug === skill.slug}
            onClick={() => setSlug(s.slug)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              s.slug === skill.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <section key={skill.slug} className="animate-rise space-y-4 px-5">
        <div className="grid grid-cols-2 gap-3">
          <VideoSlot kind="wrong" src={videos.wrong} skill={skill} />
          <VideoSlot kind="right" src={videos.right} skill={skill} />
        </div>
        <Link
          to="/skills/$slug"
          params={{ slug: skill.slug }}
          className="flex items-center justify-between rounded-2xl border border-border bg-card/70 px-4 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/60"
        >
          <span>Пълен урок: {skill.name}</span>
          <span className="text-primary">→</span>
        </Link>
      </section>
    </div>
  );
}

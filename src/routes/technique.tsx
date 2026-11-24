import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Check, X } from "lucide-react";

import { LevelBadge } from "@/components/app/LevelBadge";
import { skills, type Skill } from "@/data/skills";
import { techniqueVideos } from "@/data/videos";

export const Route = createFileRoute("/technique")({
  head: () => ({
    meta: [
      { title: "Technique library – all 12 skills | CALISTHIC" },
      { name: "description", content: "Explore all 12 calisthenics skills with 24 wrong-and-right animated technique demonstrations." },
      { property: "og:title", content: "Technique library | CALISTHIC" },
      { property: "og:description", content: "All 12 skills, with common mistakes and correct-form video demonstrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TechniquePage,
});

function VideoCard({ kind, src, poster, skill }: { kind: "wrong" | "right"; src: string | undefined; poster: string | undefined; skill: Skill }) {
  const isWrong = kind === "wrong";
  return (
    <article className="w-[78%] shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[9/16] bg-muted">
        <video src={src} poster={poster} controls playsInline loop muted preload="none" aria-label={`${skill.name} — ${isWrong ? "wrong" : "right"}`} className="size-full object-contain" />
        <span className={`pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${isWrong ? "bg-destructive text-destructive-foreground" : "bg-success text-success-foreground"}`}>
          {isWrong ? <X className="size-3" /> : <Check className="size-3" />}
          {isWrong ? "Wrong" : "Right"}
        </span>
      </div>
      <p className="p-3.5 text-sm leading-relaxed text-muted-foreground">{isWrong ? skill.wrong : skill.right}</p>
    </article>
  );
}

function TechniquePage() {
  return (
    <div>
      <header className="px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Technique</p>
        <h1 className="mt-1 text-[1.8rem] font-extrabold leading-tight">Wrong vs right</h1>
        <p className="mt-1 text-sm text-muted-foreground">12 skills · 24 videos. Swipe to see the fix.</p>
      </header>

      <nav aria-label="Jump to a skill" className="sticky top-0 z-30 mt-4 border-b border-border bg-background/95 backdrop-blur-xl">
        <ul className="flex gap-2 overflow-x-auto px-5 py-3">
          {skills.map((skill, i) => (
            <li key={skill.slug} className="shrink-0">
              <a href={`#${skill.slug}`} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-sm font-semibold active:border-primary">
                <span className="text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                {skill.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {skills.map((skill, index) => {
        const v = techniqueVideos[skill.slug];
        return (
          <section id={skill.slug} key={skill.slug} aria-labelledby={`${skill.slug}-title`} className="scroll-mt-16 border-b border-border py-6">
            <div className="flex items-start justify-between gap-3 px-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <LevelBadge level={skill.level} />
                </div>
                <h2 id={`${skill.slug}-title`} className="mt-1.5 text-xl font-bold">{skill.name}</h2>
              </div>
              <Link to="/skills/$slug" params={{ slug: skill.slug }} className="inline-flex shrink-0 items-center gap-0.5 pt-6 text-sm font-semibold text-primary">
                Lesson <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 scroll-px-5">
              <VideoCard kind="wrong" src={v?.wrong} poster={v?.wrongPoster} skill={skill} />
              <VideoCard kind="right" src={v?.right} poster={v?.rightPoster} skill={skill} />
            </div>
          </section>
        );
      })}
    </div>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Flame } from "lucide-react";

import { LevelBadge } from "@/components/app/LevelBadge";
import { PageHeader } from "@/components/app/PageHeader";
import { brand } from "@/data/brand";
import { skills } from "@/data/skills";

export const Route = createFileRoute("/skills/")({
  head: () => ({
    meta: [
      { title: "Calisthenics skills: push-up to front lever | CALISTHIC" },
      {
        name: "description",
        content: "12 skills in order of difficulty, with prerequisites, technique, progressions and training tips.",
      },
      { property: "og:title", content: "Calisthenics skill library | CALISTHIC" },
      {
        property: "og:description",
        content: "12 skills in order of difficulty, with prerequisites, technique, progressions and training tips.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Skills · Training library" title="From your first push-up to a front lever">
        Build your foundations, then progress through twelve calisthenics skills.
      </PageHeader>

      <ol className="space-y-2.5 px-5">
        {skills.map((s, i) => (
          <li key={s.slug} className="animate-rise" style={{ animationDelay: `${i * 30}ms` }}>
            <Link
              to="/skills/$slug"
              params={{ slug: s.slug }}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="font-display text-2xl font-extrabold tabular-nums text-muted-foreground transition-colors group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[15px] font-bold leading-tight">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.tagline}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <LevelBadge level={s.level} />
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <Link
        to="/story"
        className="mx-5 mt-8 block overflow-hidden rounded-lg bg-gradient-primary p-6 text-primary-foreground shadow-glow"
      >
        <Flame className="size-7" />
        <p className="mt-4 font-display text-xl font-extrabold leading-tight">
          Every skill starts with one small step.
        </p>
        <p className="mt-2 text-sm opacity-80">Read how {brand.creatorName} kept going →</p>
      </Link>
    </div>
  );
}

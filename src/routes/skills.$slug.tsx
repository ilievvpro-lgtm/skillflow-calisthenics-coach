import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Flame, HeartPulse, Lightbulb, Lock, PlayCircle } from "lucide-react";

import { generalWarmup, handBalanceSlugs, recoveryTips, wristShoulderWarmup } from "@/data/care";

import { LevelBadge } from "@/components/app/LevelBadge";
import { getSkill, skills } from "@/data/skills";

export const Route = createFileRoute("/skills/$slug")({
  loader: ({ params }) => {
    const skill = getSkill(params.slug);
    if (!skill) throw notFound();
    return { skill };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.skill.name} – progressions and steps | CALISTHIC` : "Skill | CALISTHIC";
    const description = loaderData
      ? `${loaderData.skill.tagline} Prerequisites, technique, progressions and training tips.`
      : "A complete calisthenics skill lesson.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SkillPage,
});

function SkillPage() {
  const { skill } = Route.useLoaderData();
  const index = skills.findIndex((s) => s.slug === skill.slug);
  const prev = skills[index - 1];
  const next = skills[index + 1];

  return (
    <div className="animate-rise mx-auto max-w-3xl" key={skill.slug}>
      <div className="px-5 pt-6">
        <Link to="/skills" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> All skills
        </Link>
      </div>

      <header className="px-5 pt-5">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold text-primary">
            {String(index + 1).padStart(2, "0")} / {skills.length}
          </span>
          <LevelBadge level={skill.level} />
        </div>
        <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.02]">{skill.name}</h1>
        <p className="mt-1 text-xs uppercase tracking-normal text-muted-foreground">{skill.nameEn}</p>
        <p className="mt-3 text-sm text-muted-foreground">{skill.tagline}</p>
      </header>

      <section className="mx-5 mt-6 border-y border-border py-5">
        <div className="flex items-center gap-2 text-primary">
          <Lock className="size-4" />
          <h2 className="text-sm font-bold uppercase tracking-normal">Prerequisites</h2>
        </div>
        <p className="mt-2 text-xs text-accent-foreground">Before you start, aim for:</p>
        <ul className="mt-3 space-y-2">
          {skill.prerequisites.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm font-medium text-foreground">
              <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-md border border-primary" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Not there yet? Build these foundations first, then return to the skill with greater strength and control.
        </p>
      </section>

      <section className="mx-5 mt-4 border-b border-border py-5">
        <div className="flex items-center gap-2 text-primary">
          <Flame className="size-4" />
          <h2 className="text-sm font-bold uppercase tracking-normal">Warm-up</h2>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Prepare your body before every training session.</p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {generalWarmup.map((w) => <li key={w}>• {w}</li>)}
        </ul>
        {handBalanceSlugs.includes(skill.slug) && (
          <>
            <p className="mt-4 text-xs font-bold uppercase tracking-normal text-primary">Essential: wrists and shoulders</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {wristShoulderWarmup.map((w) => <li key={w}>• {w}</li>)}
            </ul>
          </>
        )}
      </section>

      <div className="mt-8 space-y-10 px-5">
        <section aria-labelledby="technique-heading" className="space-y-3">
          <h2 id="technique-heading" className="border-b border-border pb-3 text-xl font-bold">Technique</h2>
          {skill.technique.map((t, i) => (
            <div key={t} className="flex gap-3 border-b border-border py-3 text-sm leading-relaxed">
              <span className="font-display text-sm font-bold text-primary">{i + 1}</span>
              <p>{t}</p>
            </div>
          ))}
          <Link
            to="/technique"
            hash={skill.slug}
            className="flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <PlayCircle className="size-4 text-primary" /> Watch the technique demonstrations
          </Link>
        </section>

        <section aria-labelledby="progressions-heading" className="space-y-4">
          <h2 id="progressions-heading" className="border-b border-border pb-3 text-xl font-bold">Progressions &amp; steps</h2>
          <ol className="space-y-3">
            {skill.steps.map((s, i) => (
              <li key={s.title} className="rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <h3 className="min-w-0 flex-1 text-sm font-bold">{s.title}</h3>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-primary-glow">{s.target}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>
          <h3 className="pt-2 text-base font-bold">Movement breakdown</h3>
          <ol className="space-y-3">
            {skill.breakdown.map((b, j) => (
              <li key={b.phase} className="flex gap-3 text-sm leading-relaxed">
                <span className="font-bold text-primary">{j + 1}.</span>
                <span><span className="font-semibold">{b.phase}:</span> {b.cue}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="tips-heading" className="space-y-3">
          <h2 id="tips-heading" className="border-b border-border pb-3 text-xl font-bold">Training tips</h2>
          {skill.hacks.map((h) => (
            <div key={h} className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
              <p>{h}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="recovery-heading" className="space-y-3">
          <h2 id="recovery-heading" className="border-b border-border pb-3 text-xl font-bold">Recovery</h2>
          {recoveryTips.map((r) => (
            <div key={r.title} className="rounded-lg border border-border bg-card p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold"><HeartPulse className="size-4 shrink-0 text-primary" />{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </section>
      </div>

      <nav className="mt-8 grid grid-cols-2 gap-2.5 px-5">
        {prev ? (
          <Link to="/skills/$slug" params={{ slug: prev.slug }} className="rounded-lg border border-border bg-card/70 p-4 hover:border-primary/60">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><ArrowLeft className="size-3" /> Previous</span>
            <span className="mt-1 block truncate font-display text-sm font-bold">{prev.name}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/skills/$slug" params={{ slug: next.slug }} className="rounded-lg border border-border bg-card/70 p-4 text-right hover:border-primary/60">
            <span className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">Next <ArrowRight className="size-3" /></span>
            <span className="mt-1 block truncate font-display text-sm font-bold">{next.name}</span>
          </Link>
        ) : (
          <Link to="/story" className="rounded-lg bg-gradient-primary p-4 text-right text-primary-foreground shadow-glow">
            <span className="text-[11px] opacity-80">Final skill</span>
            <span className="mt-1 block font-display text-sm font-bold">My story →</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

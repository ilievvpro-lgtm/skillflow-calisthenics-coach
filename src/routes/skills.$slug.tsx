import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Lightbulb, Lock, PlayCircle } from "lucide-react";

import { LevelBadge } from "@/components/app/LevelBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSkill, skills } from "@/data/skills";

export const Route = createFileRoute("/skills/$slug")({
  loader: ({ params }) => {
    const skill = getSkill(params.slug);
    if (!skill) throw notFound();
    return { skill };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.skill.name} – техника и стъпки | BAR SKILLS`
      : "Скил | BAR SKILLS";
    const description = loaderData
      ? `${loaderData.skill.tagline} Предпоставки, техника, стъпки и хак съвети.`
      : "Скил по калистеника.";
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

const tabTrigger =
  "flex-1 rounded-xl px-2 py-2 text-xs font-semibold text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow";

function SkillPage() {
  const { skill } = Route.useLoaderData();
  const index = skills.findIndex((s) => s.slug === skill.slug);
  const prev = skills[index - 1];
  const next = skills[index + 1];

  return (
    <div className="animate-rise" key={skill.slug}>
      <div className="px-5 pt-6">
        <Link
          to="/skills"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Всички скилове
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
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {skill.nameEn}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{skill.tagline}</p>
      </header>

      <section className="mx-5 mt-6 rounded-3xl border border-primary/40 bg-accent/60 p-5">
        <div className="flex items-center gap-2 text-primary">
          <Lock className="size-4" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Prerequisites</h2>
        </div>
        <p className="mt-2 text-xs text-accent-foreground">Първо трябва да можеш:</p>
        <ul className="mt-3 space-y-2">
          {skill.prerequisites.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm font-medium text-foreground">
              <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-md border border-primary" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Не ги покриваш още? Тренирай ги и се върни на скила – така няма контузии и прогресът е
          по-бърз.
        </p>
      </section>

      <Tabs defaultValue="technique" className="mt-6 px-5">
        <TabsList className="flex h-auto w-full gap-1 rounded-2xl border border-border bg-card p-1">
          <TabsTrigger value="technique" className={tabTrigger}>
            Техника
          </TabsTrigger>
          <TabsTrigger value="steps" className={tabTrigger}>
            Стъпки
          </TabsTrigger>
          <TabsTrigger value="breakdown" className={tabTrigger}>
            Разбивка
          </TabsTrigger>
          <TabsTrigger value="hacks" className={tabTrigger}>
            Хак tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technique" className="mt-4 space-y-2.5">
          {skill.technique.map((t, i) => (
            <div
              key={t}
              className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed shadow-card"
            >
              <span className="font-display text-sm font-bold text-primary">{i + 1}</span>
              <p>{t}</p>
            </div>
          ))}
          <Link
            to="/technique"
            className="flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <PlayCircle className="size-4 text-primary" /> Виж видео: грешно vs. правилно
          </Link>
        </TabsContent>

        <TabsContent value="steps" className="mt-4">
          <ol className="relative space-y-3 border-l border-border pl-6">
            {skill.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[33px] top-3 grid size-5 place-items-center rounded-full bg-primary font-display text-[10px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-sm font-bold">{s.title}</p>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-primary-glow">
                      {s.target}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </TabsContent>

        <TabsContent value="breakdown" className="mt-4 grid grid-cols-2 gap-2.5">
          {skill.breakdown.map((b, i) => (
            <div key={b.phase} className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Фаза {i + 1}
              </p>
              <p className="mt-1 font-display text-sm font-bold text-primary">{b.phase}</p>
              <p className="mt-2 text-sm leading-snug">{b.cue}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="hacks" className="mt-4 space-y-2.5">
          {skill.hacks.map((h) => (
            <div key={h} className="flex gap-3 rounded-2xl bg-gradient-primary p-[1px]">
              <div className="flex w-full gap-3 rounded-2xl bg-card p-4 text-sm leading-relaxed">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                <p>{h}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <nav className="mt-8 grid grid-cols-2 gap-2.5 px-5">
        {prev ? (
          <Link
            to="/skills/$slug"
            params={{ slug: prev.slug }}
            className="rounded-2xl border border-border bg-card/70 p-4 hover:border-primary/60"
          >
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <ArrowLeft className="size-3" /> Предишен
            </span>
            <span className="mt-1 block truncate font-display text-sm font-bold">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/skills/$slug"
            params={{ slug: next.slug }}
            className="rounded-2xl border border-border bg-card/70 p-4 text-right hover:border-primary/60"
          >
            <span className="flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
              Следващ <ArrowRight className="size-3" />
            </span>
            <span className="mt-1 block truncate font-display text-sm font-bold">{next.name}</span>
          </Link>
        ) : (
          <Link
            to="/story"
            className="rounded-2xl bg-gradient-primary p-4 text-right text-primary-foreground shadow-glow"
          >
            <span className="text-[11px] opacity-80">Финал</span>
            <span className="mt-1 block font-display text-sm font-bold">Моята история →</span>
          </Link>
        )}
      </nav>
    </div>
  );
}

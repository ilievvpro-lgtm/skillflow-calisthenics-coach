import { Link, createFileRoute } from "@tanstack/react-router";
import { Bot, ChevronRight, Crown, Flame, LayoutGrid, PlayCircle } from "lucide-react";

import { AccountButton } from "@/components/app/AccountButton";
import { LevelBadge } from "@/components/app/LevelBadge";
import { brand } from "@/data/brand";
import { skills } from "@/data/skills";
import { techniqueVideos } from "@/data/videos";
import { useSessionUser } from "@/hooks/use-session";
import { formatEur, plans, yearlyPerMonth } from "@/lib/plans";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home | CALISTHIC" },
      { name: "description", content: "Your calisthenics training home: next lesson, technique videos and AI coach." },
      { property: "og:title", content: "Home | CALISTHIC" },
      { property: "og:description", content: "Your calisthenics training home: next lesson, technique videos and AI coach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

const shortcuts = [
  { to: "/skills", label: "Skills", sub: "12 lessons", icon: LayoutGrid },
  { to: "/technique", label: "Technique", sub: "24 videos", icon: PlayCircle },
  { to: "/coach", label: "AI Coach", sub: "Ask anything", icon: Bot },
  { to: "/story", label: "My Story", sub: brand.creatorName, icon: Flame },
] as const;

function HomePage() {
  const { user } = useSessionUser();
  const name = user?.email?.split("@")[0];
  const first = skills[0]!;
  const poster = techniqueVideos[first.slug]?.rightPoster;

  return (
    <div className="animate-rise px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between gap-3">
        <p className="font-display text-sm font-extrabold tracking-[0.3em] text-primary">{brand.appName}</p>
        <AccountButton />
      </header>

      <h1 className="mt-6 text-[1.9rem] font-extrabold leading-tight">
        {name ? <>Hey, <span className="text-primary">{name}</span></> : "Ready to train?"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">One small step today. Let's go.</p>

      <Link
        to="/skills/$slug"
        params={{ slug: first.slug }}
        className="relative mt-6 block overflow-hidden rounded-xl border border-border bg-card"
      >
        <img src={poster} alt="" className="h-44 w-full object-cover object-[center_70%] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Start here · Lesson 01</p>
          <p className="mt-1 text-xl font-extrabold">{first.name}</p>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{first.tagline}</p>
        </div>
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {shortcuts.map(({ to, label, sub, icon: Icon }) => (
          <Link key={to} to={to} className="rounded-xl border border-border bg-card p-4 transition-colors active:bg-secondary">
            <Icon className="size-6 text-primary" />
            <p className="mt-3 font-bold">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </Link>
        ))}
      </div>

      <Link to="/paywall" className="mt-4 flex items-center gap-4 rounded-xl bg-gradient-primary p-4 text-primary-foreground shadow-glow">
        <Crown className="size-7 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-extrabold">Go Premium</p>
          <p className="text-xs opacity-80">{formatEur(plans.monthly.priceEur)}/month or {formatEur(plans.yearly.priceEur)}/year ({formatEur(yearlyPerMonth())}/mo)</p>
        </div>
        <ChevronRight className="size-5 shrink-0" />
      </Link>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your roadmap</h2>
          <Link to="/skills" className="text-sm font-semibold text-primary">See all</Link>
        </div>
        <ol className="-mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
          {skills.map((s, i) => (
            <li key={s.slug} className="w-36 shrink-0 snap-start">
              <Link to="/skills/$slug" params={{ slug: s.slug }} className="block rounded-xl border border-border bg-card p-3">
                <p className="font-display text-xl font-extrabold tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 truncate text-sm font-bold">{s.name}</p>
                <div className="mt-2"><LevelBadge level={s.level} /></div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

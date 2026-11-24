import { Link, createFileRoute } from "@tanstack/react-router";
import { Bot, Check, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { techniqueVideos } from "@/data/videos";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome to CALISTHIC" },
      { name: "description", content: "See how CALISTHIC takes you from the basics to advanced calisthenics skills." },
      { property: "og:title", content: "Welcome to CALISTHIC" },
      { property: "og:description", content: "See how CALISTHIC takes you from the basics to advanced calisthenics skills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OnboardingPage,
});

function Poster({ src, label, tone }: { src: string | undefined; label: ReactNode; tone: "bad" | "good" | "plain" }) {
  return (
    <figure className="relative h-full min-w-0 overflow-hidden rounded-xl border border-border bg-card">
      <img src={src} alt="" className="size-full object-cover" />
      {tone !== "plain" && (
        <figcaption className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone === "bad" ? "bg-destructive text-destructive-foreground" : "bg-success text-success-foreground"}`}>
          {label}
        </figcaption>
      )}
    </figure>
  );
}

const slides = [
  {
    title: "12 skills, one clear path",
    text: "Start with the push-up and work all the way up to the front lever. Every lesson tells you exactly what to do next.",
    visual: <Poster src={techniqueVideos["front-lever"]?.rightPoster} label="" tone="plain" />,
  },
  {
    title: "See the mistake, then the fix",
    text: "Every skill has a short video of the most common mistake next to the correct form.",
    visual: (
      <div className="grid h-full grid-cols-2 gap-3">
        <Poster src={techniqueVideos["handstand"]?.wrongPoster} tone="bad" label={<><X className="size-3" /> Wrong</>} />
        <Poster src={techniqueVideos["handstand"]?.rightPoster} tone="good" label={<><Check className="size-3" /> Right</>} />
      </div>
    ),
  },
  {
    title: "Your AI coach, 24/7",
    text: "Stuck on a skill? Ask your coach anything and get a plan built around where you are today.",
    visual: (
      <div className="flex h-full flex-col justify-center gap-3 rounded-xl border border-border bg-card p-5">
        <div className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground"><Bot className="size-6" /></div>
        <p className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">I can do 5 pull-ups. How do I get a muscle-up?</p>
        <p className="max-w-[90%] rounded-lg rounded-bl-sm border border-border bg-background px-4 py-3 text-sm text-foreground">First get to 8 explosive pull-ups to the chest. Here is your 3-day plan…</p>
      </div>
    ),
  },
];

function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const slide = slides[index]!;
  const last = index === slides.length - 1;

  return (
    <div className="flex min-h-dvh flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5" aria-label={`Step ${index + 1} of ${slides.length}`}>
          {slides.map((s, i) => (
            <span key={s.title} className={`h-1.5 rounded-full transition-all ${i === index ? "w-7 bg-primary" : "w-1.5 bg-border"}`} />
          ))}
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/auth" search={{ mode: "signup" }}>Skip</Link>
        </Button>
      </div>

      <div key={index} className="mt-6 flex flex-1 animate-rise flex-col">
        <div className="h-[46dvh] min-h-64">{slide.visual}</div>
        <h1 className="mt-8 text-[1.9rem] font-extrabold leading-tight">{slide.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{slide.text}</p>
      </div>

      <div className="mt-8 grid grid-cols-[auto_1fr] gap-3">
        <Button variant="outline" size="xl" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}>Back</Button>
        {last ? (
          <Button asChild variant="hero" size="xl"><Link to="/auth" search={{ mode: "signup" }}>Create account</Link></Button>
        ) : (
          <Button variant="hero" size="xl" onClick={() => setIndex((i) => i + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
}

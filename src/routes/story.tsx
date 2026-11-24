import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";
import heroAsset from "@/assets/plamen-full-handstand.png.asset.json";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: `My story – ${brand.creatorName} | CALISTHIC` },
      {
        name: "description",
        content: "I started with 3 pull-ups and 0 push-ups. If I can do it, so can you.",
      },
      { property: "og:title", content: `My story – ${brand.creatorName} | CALISTHIC` },
      {
        property: "og:description",
        content: "I started with 3 pull-ups and 0 push-ups. If I can do it, so can you.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});

const chapters = [
  {
    title: "3 pull-ups. 0 push-ups.",
    text: "I started with 3 pull-ups and 0 push-ups. People around me were doing muscle-ups, while I was too embarrassed to even get on the bar.",
  },
  {
    title: "The months without progress",
    text: "There were weeks with no progress at all. Learning a handstand took me more than a year. Not because I lacked strength, but because I wanted results too quickly.",
  },
  {
    title: "Why I kept going",
    text: "I stopped comparing myself with others and started comparing myself with who I was yesterday. One more repetition. One more second. That is all it takes.",
  },
];

function StoryPage() {
  return (
    <div>
      <div className="pt-[max(1.25rem,env(safe-area-inset-top))]">
        <header className="w-full animate-rise px-5 pb-2 pt-4">
          <p className="text-xs font-semibold uppercase tracking-normal text-primary">My Story · {brand.creatorName}</p>
          <h1 className="mt-2 text-[2.4rem] font-extrabold leading-[0.98]">
            I was not born <span className="text-gradient-primary">strong.</span>
          </h1>
        </header>
      </div>

      <div className="space-y-4 px-5 pt-2">
        {chapters.map((c, i) => (
          <article key={c.title} className="animate-rise border-b border-border py-5" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="font-display text-xs font-bold text-primary">0{i + 1}</p>
            <h2 className="mt-1 text-lg font-bold">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          </article>
        ))}

        <blockquote className="rounded-lg bg-gradient-primary p-6 text-primary-foreground shadow-glow">
          <Quote className="size-6 opacity-70" />
          <p className="mt-3 font-display text-xl font-extrabold leading-tight">
            If I could build this from zero, so can you. Just keep going.
          </p>
          <footer className="mt-3 text-sm font-medium opacity-80">— {brand.creatorName}</footer>
        </blockquote>

        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={heroAsset.url}
            alt="Plamen holding a handstand at sunset"
            className="block h-auto w-full"
            width={1025}
            height={1920}
            loading="lazy"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">{brand.creatorName} today — after starting from 0 push-ups.</figcaption>
        </figure>

        <div className="border-t border-border py-5 text-center">
          <p className="text-sm text-muted-foreground">Follow my daily training</p>
          <Button asChild variant="hero" size="xl" className="mt-4 w-full">
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
              <Instagram className="size-5" /> @{brand.instagramHandle}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

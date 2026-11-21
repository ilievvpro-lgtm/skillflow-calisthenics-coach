import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";
import heroImg from "@/assets/hero-front-lever.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: `Моята история – ${brand.creatorName} | BAR SKILLS` },
      {
        name: "description",
        content: "Как започнах без нито едно набиране и стигнах до предната везна. Всеки може.",
      },
      { property: "og:title", content: `Моята история – ${brand.creatorName} | BAR SKILLS` },
      {
        property: "og:description",
        content: "Как започнах без нито едно набиране и стигнах до предната везна. Всеки може.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});

const chapters = [
  {
    title: "Нула набирания",
    text: "Първия ден на лоста висях 10 секунди и паднах. Нито едно набиране. Около мен хора правеха muscle-up-и, а аз се срамувах да се кача.",
  },
  {
    title: "Месеците, в които нищо не става",
    text: "Имаше седмици без никакъв прогрес. Стойката на ръце ми отне повече от година. Не защото нямах сила – а защото исках бързо.",
  },
  {
    title: "Защо не спрях",
    text: "Спрях да се сравнявам с другите и започнах да се сравнявам с мен от вчера. Едно повторение повече. Една секунда повече. Това е всичко.",
  },
];

function StoryPage() {
  return (
    <div>
      <div className="relative h-[62dvh] min-h-[420px] overflow-hidden">
        <img
          src={heroImg}
          alt="Атлет задържа предна везна на лост при залез"
          className="absolute inset-0 size-full object-cover"
          width={1024}
          height={1536}
        />
        <div className="absolute inset-0 bg-fade-bottom" />
        <div className="absolute inset-x-0 bottom-0 animate-rise px-5 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">My Story · {brand.creatorName}</p>
          <h1 className="mt-2 text-[2.4rem] font-extrabold leading-[0.98]">
            Не съм роден <span className="text-gradient-primary">силен.</span>
          </h1>
        </div>
      </div>

      <div className="space-y-4 px-5 pt-2">
        {chapters.map((c, i) => (
          <article key={c.title} className="animate-rise rounded-3xl border border-border bg-card p-5 shadow-card" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="font-display text-xs font-bold text-primary">0{i + 1}</p>
            <h2 className="mt-1 text-lg font-bold">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          </article>
        ))}

        <blockquote className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-glow">
          <Quote className="size-6 opacity-70" />
          <p className="mt-3 font-display text-xl font-extrabold leading-tight">
            Ако аз го направих от нула – и ти можеш. Просто не спирай.
          </p>
          <footer className="mt-3 text-sm font-medium opacity-80">— {brand.creatorName}</footer>
        </blockquote>

        <div className="rounded-3xl border border-border bg-card p-5 text-center shadow-card">
          <p className="text-sm text-muted-foreground">Следи тренировките ми всеки ден</p>
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

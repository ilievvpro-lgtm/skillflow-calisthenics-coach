import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PhotoBackdrop } from "@/components/app/PhotoBackdrop";
import { Button } from "@/components/ui/button";
import { formatEur, freeTier, plans, yearlyPerMonth, yearlySavingsPercent, type PlanId } from "@/lib/plans";

export const Route = createFileRoute("/paywall")({
  head: () => ({
    meta: [
      { title: "CALISTHIC Premium – €6.99/month or €59/year" },
      { name: "description", content: "Unlock every CALISTHIC skill, technique video and the AI coach for €6.99 a month or €59 a year." },
      { property: "og:title", content: "CALISTHIC Premium" },
      { property: "og:description", content: "Every skill, technique video and the AI coach for €6.99 a month or €59 a year." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaywallPage,
});

const benefits = [
  "All 12 skills, from push-up to front lever",
  "24 wrong-vs-right technique videos",
  "Unlimited questions to your AI coach",
  "Warm-ups, progressions and recovery for every skill",
];

function PaywallPage() {
  const [selected, setSelected] = useState<PlanId>("yearly");

  const options = [
    { id: "yearly" as const, title: "Yearly", price: `${formatEur(plans.yearly.priceEur)} / year`, note: `${formatEur(yearlyPerMonth())} per month`, badge: `Save ${yearlySavingsPercent()}%` },
    { id: "monthly" as const, title: "Monthly", price: `${formatEur(plans.monthly.priceEur)} / month`, note: "Cancel anytime", badge: null },
  ];

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[42dvh]"><PhotoBackdrop /></div>
      <div className="relative flex flex-1 flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="icon" aria-label="Close" className="rounded-full bg-background/50 backdrop-blur-md">
            <Link to="/home"><X /></Link>
          </Button>
        </div>

        <div className="mt-[18dvh] animate-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">CALISTHIC Premium</p>
          <h1 className="mt-2 text-[2rem] font-extrabold leading-tight">Unlock your full training</h1>
          <ul className="mt-5 grid gap-2.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary"><Check className="size-3.5" /></span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-border bg-card p-3.5">
              <p className="font-bold">Free</p>
              <ul className="mt-2 grid gap-1.5 text-muted-foreground">
                <li>{freeTier.basicSkills} basic skills</li>
                <li>{freeTier.coachQuestionsPerMonth} coach questions / month</li>
              </ul>
            </div>
            <div className="rounded-xl border border-primary bg-accent p-3.5">
              <p className="font-bold text-primary">Premium</p>
              <ul className="mt-2 grid gap-1.5 text-accent-foreground">
                <li>All 12 skills</li>
                <li>Unlimited coach</li>
              </ul>
            </div>
          </div>

          <div role="radiogroup" aria-label="Choose a plan" className="mt-7 grid gap-3">
            {options.map((o) => {
              const active = selected === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelected(o.id)}
                  className={`relative flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors ${active ? "border-primary bg-accent" : "border-border bg-card"}`}
                >
                  <span className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${active ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                    {active && <span className="size-2 rounded-full bg-primary-foreground" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{o.title}</span>
                    <span className="block text-xs text-muted-foreground">{o.note}</span>
                  </span>
                  <span className="text-right font-extrabold">{o.price}</span>
                  {o.badge && (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">{o.badge}</span>
                  )}
                </button>
              );
            })}
          </div>

          <Button
            variant="hero"
            size="xl"
            className="mt-6 w-full"
            onClick={() => toast.info("Card payments are being set up. You'll be able to subscribe very soon.")}
          >
            Continue with {selected === "yearly" ? formatEur(plans.yearly.priceEur) : formatEur(plans.monthly.priceEur)}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Renews automatically. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}

export type PlanId = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  label: string;
  priceEur: number;
  period: "month" | "year";
}

export const plans: Record<PlanId, Plan> = {
  monthly: { id: "monthly", label: "Monthly", priceEur: 6.99, period: "month" },
  yearly: { id: "yearly", label: "Yearly", priceEur: 59, period: "year" },
};

export function formatEur(value: number): string {
  return `€${value.toFixed(2).replace(/\.00$/, "")}`;
}

/** Yearly price spread across 12 months, rounded to cents. */
export function yearlyPerMonth(): number {
  return Math.round((plans.yearly.priceEur / 12) * 100) / 100;
}

/** Whole-percent saving of the yearly plan versus paying monthly for 12 months. */
export function yearlySavingsPercent(): number {
  return Math.round((1 - plans.yearly.priceEur / (plans.monthly.priceEur * 12)) * 100);
}

/** What the paywall promises for the free tier (copy only; nothing is locked yet). */
export const freeTier = { coachQuestionsPerMonth: 3, basicSkills: 4 } as const;

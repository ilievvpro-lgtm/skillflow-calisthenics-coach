import { describe, expect, it } from "vitest";
import { formatEur, freeTier, plans, yearlyPerMonth, yearlySavingsPercent } from "@/lib/plans";

describe("subscription prices", () => {
  it("monthly plan costs 6.99 euro per month", () => {
    expect(plans.monthly.priceEur).toBe(6.99);
    expect(plans.monthly.period).toBe("month");
  });
  it("yearly plan costs 59 euro per year", () => {
    expect(plans.yearly.priceEur).toBe(59);
    expect(plans.yearly.period).toBe("year");
  });
  it("yearly plan works out to 4.92 euro a month, saving 30%", () => {
    expect(yearlyPerMonth()).toBe(4.92);
    expect(yearlySavingsPercent()).toBe(30);
  });
  it("formats prices in euro", () => {
    expect(formatEur(6.99)).toBe("€6.99");
    expect(formatEur(59)).toBe("€59");
  });
  it("free version is described as 3 coach questions a month and 4 basic skills", () => {
    expect(freeTier.coachQuestionsPerMonth).toBe(3);
    expect(freeTier.basicSkills).toBe(4);
  });
});

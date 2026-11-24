import { describe, expect, it } from "vitest";

import { equipment } from "@/data/park-equipment";
import { parks } from "@/data/parks";
import { getSkill } from "@/data/skills";
import { searchParks } from "@/lib/park-search";

describe("Sofia parks map", () => {
  it("only lists parks inside Sofia", () => {
    expect(parks.length).toBeGreaterThan(50);
    for (const p of parks) {
      expect(p.lat).toBeGreaterThan(42.55);
      expect(p.lat).toBeLessThan(42.82);
    }
  });

  it("finds Geo Milev parks in Latin or Cyrillic", () => {
    expect(searchParks(parks, "geo milev").length).toBeGreaterThan(0);
    expect(searchParks(parks, "Гео Милев").length).toBeGreaterThan(0);
    expect(searchParks(parks, "Drujba").length).toBe(searchParks(parks, "druzhba").length);
  });

  it("dip bars teach dips, elbow lever, front lever and back lever", () => {
    expect(equipment.find((e) => e.id === "dip-bars")?.skills).toEqual(["dips", "elbow-lever", "front-lever", "back-lever"]);
  });

  it("the ground is for push-ups and every equipment skill exists in the app", () => {
    expect(equipment.find((e) => e.id === "ground")?.skills).toContain("pushup");
    for (const e of equipment) for (const s of e.skills) expect(getSkill(s), s).toBeDefined();
  });
});

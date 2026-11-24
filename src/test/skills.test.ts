import { describe, expect, it } from "vitest";

import { skills } from "@/data/skills";

describe("skills roadmap", () => {
  it("teaches skills in the creator's order, easiest to hardest", () => {
    expect(skills.map((s) => s.slug)).toEqual([
      "pushup",
      "dips",
      "pullup",
      "elbow-lever",
      "frog-stand",
      "crow-stand",
      "handstand",
      "tuck-press",
      "hspu",
      "muscle-up",
      "back-lever",
      "front-lever",
    ]);
  });

  it("requires 8 explosive chest-to-bar pull-ups before the muscle-up", () => {
    const muscleUp = skills.find((s) => s.slug === "muscle-up");
    expect(muscleUp?.prerequisites).toContain("8 explosive chest-to-bar pull-ups");
  });
});

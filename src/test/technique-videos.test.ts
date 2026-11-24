import { describe, expect, it } from "vitest";

import { skills } from "@/data/skills";
import { techniqueVideos } from "@/data/videos";

describe("generated technique video catalog", () => {
  it("provides 24 distinct clips for all 12 skills", () => {
    expect(skills).toHaveLength(12);
    const urls = skills.flatMap((skill) => {
      const clips = techniqueVideos[skill.slug];
      expect(clips, skill.slug).toBeDefined();
      if (!clips) throw new Error(`Missing clips: ${skill.slug}`);
      expect(clips.wrong).toMatch(/^\/__l5e\/assets-v1\/.+\.mp4$/);
      expect(clips.right).toMatch(/^\/__l5e\/assets-v1\/.+\.mp4$/);
      expect(clips.wrongPoster).toMatch(/^\/__l5e\/assets-v1\/.+\.jpg$/);
      expect(clips.rightPoster).toMatch(/^\/__l5e\/assets-v1\/.+\.jpg$/);
      return [clips.wrong, clips.right];
    });
    expect(new Set(urls).size).toBe(24);
  });
});
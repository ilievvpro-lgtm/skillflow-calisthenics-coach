import type { SkillLevel } from "@/data/skills";

const tone: Record<SkillLevel, string> = {
  "Foundation": "bg-success/15 text-success",
  "Beginner+": "bg-success/10 text-success",
  "Intermediate": "bg-primary-glow/15 text-primary-glow",
  "Intermediate+": "bg-primary/15 text-primary",
  "Advanced": "bg-destructive/15 text-destructive",
};

export function LevelBadge({ level }: { level: SkillLevel }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-normal ${tone[level]}`}>
      {level}
    </span>
  );
}

import type { SkillLevel } from "@/data/skills";

const tone: Record<SkillLevel, string> = {
  "Основа": "bg-success/15 text-success",
  "Начинаещ+": "bg-success/10 text-success",
  "Среден": "bg-primary-glow/15 text-primary-glow",
  "Среден+": "bg-primary/15 text-primary",
  "Напреднал": "bg-destructive/15 text-destructive",
};

export function LevelBadge({ level }: { level: SkillLevel }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${tone[level]}`}>
      {level}
    </span>
  );
}

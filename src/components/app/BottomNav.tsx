import { Link } from "@tanstack/react-router";
import { Bot, Flame, LayoutGrid, PlayCircle } from "lucide-react";

const items = [
  { to: "/", label: "Coach", sub: "AI помощник", icon: Bot, exact: true },
  { to: "/technique", label: "Technique", sub: "Видео уроци", icon: PlayCircle, exact: false },
  { to: "/skills", label: "Skills", sub: "Умения", icon: LayoutGrid, exact: false },
  { to: "/story", label: "My Story", sub: "Историята", icon: Flame, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Основна навигация"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <ul className="grid w-full max-w-md grid-cols-4 gap-1 rounded-3xl border border-border bg-card/85 p-1.5 shadow-card backdrop-blur-xl">
        {items.map(({ to, label, sub, icon: Icon, exact }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact }}
              className="group flex flex-col items-center gap-0.5 rounded-2xl px-1 py-2 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-primary data-[status=active]:text-primary-foreground data-[status=active]:shadow-glow"
            >
              <Icon className="size-5" strokeWidth={2.2} />
              <span className="font-display text-[10px] font-semibold leading-tight tracking-tight">
                {label}
              </span>
              <span className="text-[9px] leading-tight opacity-70">{sub}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

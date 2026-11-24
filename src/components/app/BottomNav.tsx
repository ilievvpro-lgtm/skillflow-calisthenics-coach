import { Link } from "@tanstack/react-router";
import { Bot, Flame, Home, LayoutGrid, Map, PlayCircle } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/skills", label: "Skills", icon: LayoutGrid },
  { to: "/technique", label: "Technique", icon: PlayCircle },
  { to: "/coach", label: "Coach", icon: Bot },
  { to: "/map", label: "Map", icon: Map },
  { to: "/story", label: "Story", icon: Flame },
] as const;

export function BottomNav() {
  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md">
      <ul className="grid grid-cols-6 border-t border-border bg-card/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 rounded-lg py-1.5 text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icon className="size-[22px]" strokeWidth={2.1} />
              <span className="text-[10px] font-semibold leading-none">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

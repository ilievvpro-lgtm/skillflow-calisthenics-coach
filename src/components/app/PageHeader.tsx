import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="animate-rise px-5 pt-8 pb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold leading-[1.05] text-foreground">{title}</h1>
      {children ? <div className="mt-3 text-sm text-muted-foreground">{children}</div> : null}
    </header>
  );
}

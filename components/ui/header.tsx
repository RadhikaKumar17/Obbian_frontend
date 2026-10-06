import type { ReactNode } from "react";

/** Page heading: optional eyebrow, large title, optional subtitle and right-hand slot. */
export default function Header({ eyebrow, title, subtitle, actions }: { eyebrow?: string; title: ReactNode; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 text-base text-muted">{subtitle}</p>}
      </div>
      {actions}
    </header>
  );
}

import type { ReactNode } from "react";

/** Centered empty state used by every "nothing here yet" panel. */
export default function EmptyState({ icon, title, children, action }: { icon: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <section className="panel flex flex-col items-center px-6 py-12 text-center">
      <span className="icon-tile">{icon}</span>
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      {children && <p className="muted mt-2 max-w-sm">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </section>
  );
}

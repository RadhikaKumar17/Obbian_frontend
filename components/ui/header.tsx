import type { ReactNode } from "react";

/** Page title. `accent` highlights one word of the title in the brand colour. */
export default function Header({ title, subtitle, accent, actions }: { title: string; subtitle: string; accent?: string; actions?: ReactNode }) {
  const index = accent ? title.indexOf(accent) : -1;
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-[26px] font-bold leading-tight tracking-[-.7px] sm:text-[32px]">
          {index >= 0 && accent ? (
            <>
              {title.slice(0, index)}
              <span className="text-accent">{accent}</span>
              {title.slice(index + accent.length)}
            </>
          ) : (
            title
          )}
        </h1>
        <p className="muted mt-1.5 text-sm">{subtitle}</p>
      </div>
      {actions}
    </header>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import { useDemoAuth } from "@/components/demo-auth-provider";
import { CalendarIcon, CarIcon, ChatIcon, HeartIcon, HelpIcon, LeafIcon, LogoMark, LogoutIcon, UserIcon } from "@/components/ui/icons";
import Link from "next/link";

const nav = [
  { href: "/", label: "Vehicles", Icon: CarIcon, match: ["/", "/search", "/vehicle", "/checkout", "/confirmation"] },
  { href: "/trips", label: "Trips", Icon: CalendarIcon, match: ["/trips", "/tracking"] },
  { href: "/saved", label: "Saved", Icon: HeartIcon, match: ["/saved"] },
  { href: "/policy", label: "AI Assistant", Icon: ChatIcon, match: ["/policy"] },
];

export default function Sidebar() {
  const { user, logout, busy, error } = useDemoAuth();
  const { path } = useObbian();
  return (
    <aside className="sticky top-0 z-30 flex flex-col border-b border-line bg-white md:fixed md:inset-y-0 md:left-0 md:w-56 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-3 p-4 md:p-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Obbian home">
          <LogoMark />
          <span>
            <span className="block font-display text-lg font-bold leading-none tracking-wide">OBBIAN</span>
            <span className="text-[9px] uppercase tracking-widest text-muted">Move smarter</span>
          </span>
        </Link>
        <button type="button" disabled={busy} onClick={() => void logout()} aria-label="Log out" className="grid size-10 place-items-center rounded-xl text-muted transition hover:bg-wash hover:text-brand disabled:opacity-50 md:hidden">
          <LogoutIcon size={18} />
        </button>
      </div>
      <nav aria-label="Main navigation" className="flex gap-1 overflow-x-auto px-3 pb-3 md:mt-4 md:flex-col md:pb-0">
        {nav.map(({ href, label, Icon, match }) => {
          const on = match.includes(path);
          return (
            <Link
              key={href}
              href={href}
              aria-current={on ? "page" : undefined}
              className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition ${on ? "bg-tint text-brand-strong" : "text-ink hover:bg-wash"}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
        <Link href="/support" aria-current={path === "/support" ? "page" : undefined} className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition md:hidden ${path === "/support" ? "bg-tint text-brand-strong" : "text-ink hover:bg-wash"}`}>
          <HelpIcon size={17} />
          Help
        </Link>
      </nav>
      <div className="mt-auto hidden px-3 md:block">
        <div className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm text-muted" title={user.email}>
          <UserIcon size={17} className="shrink-0" />
          <span className="min-w-0">
            <span className="block truncate text-ink">{user.name}</span>
            <span className="block truncate text-xs">{user.email}</span>
          </span>
        </div>
        <Link href="/support" aria-current={path === "/support" ? "page" : undefined} className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm transition hover:bg-wash ${path === "/support" ? "bg-tint text-brand-strong" : "text-muted"}`}>
          <HelpIcon size={17} />
          Help
        </Link>
        <button type="button" disabled={busy} onClick={() => void logout()} className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm text-muted transition hover:bg-wash disabled:opacity-50">
          <LogoutIcon size={17} />
          {busy ? 'Logging out…' : 'Log out'}
        </button>
        {error && <p role="alert" className="px-4 py-1 text-xs text-danger">{error}</p>}
        <div className="my-4 rounded-2xl bg-tint p-4 text-sm font-medium text-brand-strong">
          <LeafIcon size={20} className="mb-2" />
          A cleaner tomorrow moves with you.
        </div>
      </div>
    </aside>
  );
}

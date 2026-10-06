"use client";

import { useObbian } from "@/components/obbian-provider";
import { useDemoAuth } from "@/components/demo-auth-provider";
import { CalendarIcon, CarIcon, HeartIcon, LeafIcon, LifebuoyIcon, LogoMark, LogoutIcon } from "@/components/ui/icons";
import Link from "next/link";

const nav = [
  { href: "/", label: "Discover", Icon: CarIcon },
  { href: "/trips", label: "My Trips", Icon: CalendarIcon },
  { href: "/saved", label: "Saved", Icon: HeartIcon },
  { href: "/support", label: "Support", Icon: LifebuoyIcon },
];

export default function Sidebar() {
  const { user, logout, busy, error } = useDemoAuth();
  const { path } = useObbian();
  const active =
    path === "/policy"
      ? "/support"
      : ["/trips", "/saved", "/support"].includes(path)
        ? path
        : "/";
  const initials = user.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <aside className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:flex md:w-[232px] md:flex-col md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4 md:px-6 md:pb-5 md:pt-7">
        <Link href="/" className="flex items-center gap-3 rounded-lg" aria-label="Obbian home">
          <LogoMark />
          <span>
            <span className="block text-[19px] font-bold uppercase leading-6 tracking-[.14em] text-ink">Obbian</span>
            <span className="block text-[10px] font-medium uppercase tracking-[.12em] text-muted">Rides for a better tomorrow</span>
          </span>
        </Link>
        <button type="button" disabled={busy} onClick={() => void logout()} aria-label="Log out" className="grid size-10 place-items-center rounded-xl text-muted transition hover:bg-tint hover:text-brand disabled:opacity-50 md:hidden">
          <LogoutIcon size={18} />
        </button>
      </div>
      <nav
        aria-label="Main navigation"
        className="flex gap-1.5 overflow-x-auto px-3 pb-3 md:mt-2 md:flex-col md:gap-1 md:px-4"
      >
        {nav.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={active === href ? "page" : undefined}
            className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${active === href ? "bg-tint text-brand" : "text-ink hover:bg-wash"}`}
          >
            <Icon size={19} className={active === href ? "text-brand" : "text-muted"} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto hidden md:block">
        <div className="mx-4 mb-4 overflow-hidden rounded-2xl bg-tint p-4">
          <LeafIcon size={22} className="text-accent" />
          <p className="mt-2 text-sm font-semibold leading-5 text-brand">A cleaner tomorrow moves with you.</p>
        </div>
        <div className="border-t border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-xs font-semibold text-white">{initials}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <button type="button" disabled={busy} onClick={() => void logout()} className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-wash hover:text-brand disabled:opacity-50">
            <LogoutIcon size={17} />
            {busy ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </div>
      {error && <p role="alert" className="px-5 pb-3 text-xs text-danger">{error}</p>}
    </aside>
  );
}

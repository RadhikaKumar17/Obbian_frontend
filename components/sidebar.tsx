"use client";

import { useObbian } from "@/components/obbian-provider";
import { useDemoAuth } from "@/components/demo-auth-provider";
import Link from "next/link";

export default function Sidebar() {
  const { user, logout, busy, error } = useDemoAuth();
  const { path } = useObbian();
  const nav = [
    ["/", "Discover"],
    ["/trips", "My Trips"],
    ["/saved", "Saved"],
    ["/support", "Support"],
  ];
  const active =
    path === "/policy"
      ? "/support"
      : ["/trips", "/saved", "/support"].includes(path)
        ? path
        : "/";
  return (
    <aside className="border-b border-line bg-white md:fixed md:inset-y-0 md:left-0 md:w-[220px] md:border-0">
      <div className="px-7 pb-5 pt-7">
        <Link href="/" className="text-[30px] font-bold leading-9 text-brand">
          Obbian
        </Link>
        <p className="mt-1 text-[11px] text-muted">
          Rides for a better tomorrow
        </p>
      </div>
      <nav
        aria-label="Main navigation"
        className="flex gap-2 overflow-x-auto px-[18px] pb-4 md:mt-3 md:flex-col md:gap-3"
      >
        {nav.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={active === href ? "page" : undefined}
            className={`whitespace-nowrap rounded-[10px] px-4 py-3 text-sm font-medium transition hover:bg-wash ${active === href ? "bg-tint text-brand" : "text-ink"}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-line px-6 py-4 md:absolute md:inset-x-0 md:bottom-0">
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="mt-1 break-all text-xs text-muted">{user.email}</p>
        <button type="button" disabled={busy} onClick={() => void logout()} className="mt-3 text-sm font-semibold text-brand disabled:opacity-50">{busy ? 'Logging out…' : 'Log out'}</button>
        {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
      </div>
    </aside>
  );
}

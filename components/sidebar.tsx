"use client";

import { useObbian } from "@/components/obbian-provider";
import Link from "next/link";

export default function Sidebar() {
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
    </aside>
  );
}

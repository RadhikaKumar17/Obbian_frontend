"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Go from "@/components/ui/go";
import { AlertIcon, CalendarIcon, ShieldIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";

export default function SupportCardPanel({ title, sub, cta, href }: { title: string; sub: string; cta: string; href: string }) {
  const { setContact } = useObbian();
  const Icon = href === "contact" ? AlertIcon : href === "/trips" ? CalendarIcon : ShieldIcon;
  return (
    <Panel className="flex flex-col transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <span className="icon-tile"><Icon size={21} /></span>
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="muted mb-6 mt-1.5">{sub}</p>
      <div className="mt-auto">
        {href === "contact" ? (
          <Button secondary onClick={() => setContact(true)}>{cta}</Button>
        ) : (
          <Go href={href} secondary={href !== "/policy"}>{cta}</Go>
        )}
      </div>
    </Panel>
  );
}

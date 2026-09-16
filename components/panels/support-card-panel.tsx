"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";

export default function SupportCardPanel({ title, sub, cta, href }: { title: string; sub: string; cta: string; href: string }) {
  const { setContact } = useObbian();
  return (
    <Panel>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="muted mb-10 mt-3">{sub}</p>
      {href === "contact" ? (
        <Button onClick={() => setContact(true)}>{cta}</Button>
      ) : (
        <Go href={href}>{cta}</Go>
      )}
    </Panel>
  );
}

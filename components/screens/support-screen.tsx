"use client";

import { useObbian } from "@/components/obbian-provider";
import PopularHelpPanel from "@/components/panels/popular-help-panel";
import SupportCardPanel from "@/components/panels/support-card-panel";
import Header from "@/components/ui/header";
import { SearchIcon } from "@/components/ui/icons";
import Input from "@/components/ui/input";

export default function SupportScreen() {
  const { helpQuery, setHelpQuery } = useObbian();
  return (
    <>
      <Header
        title="Support Centre"
        subtitle="Help with bookings, policies, payments and safety"
      />
      <div className="relative">
        <SearchIcon size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <Input
          aria-label="Search help articles"
          type="search"
          value={helpQuery}
          onChange={(e) => setHelpQuery(e.target.value)}
          className="!rounded-2xl !py-4 !pl-12 shadow-card"
          placeholder="Search help articles and rental policies"
        />
      </div>
      <div className="my-6 grid gap-5 sm:grid-cols-3">
        {[
          [
            "Policy assistant",
            "Answers with policy references",
            "Open Policy AI",
            "/policy",
          ],
          [
            "Booking support",
            "Change or cancel a rental",
            "Manage trip",
            "/trips",
          ],
          [
            "Emergency help",
            "24/7 roadside assistance",
            "Contact options",
            "contact",
          ],
        ].map(([title, sub, cta, href]) => (
          <SupportCardPanel key={title} title={title} sub={sub} cta={cta} href={href} />
        ))}
      </div>
      <PopularHelpPanel />
    </>
  );
}

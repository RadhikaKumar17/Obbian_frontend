"use client";

import { useObbian } from "@/components/obbian-provider";
import PopularHelpPanel from "@/components/panels/popular-help-panel";
import SupportCardPanel from "@/components/panels/support-card-panel";
import Header from "@/components/ui/header";
import Input from "@/components/ui/input";

export default function SupportScreen() {
  const { helpQuery, setHelpQuery } = useObbian();
  return (
    <>
      <Header
        title="Support Centre"
        subtitle="Help with bookings, policies, payments and safety"
      />
      <Input
        aria-label="Search help articles"
        value={helpQuery}
        onChange={(e) => setHelpQuery(e.target.value)}
        className="field !bg-white !py-5"
        placeholder="⌕ Search help articles and rental policies"
      />
      <div className="my-7 grid gap-6 sm:grid-cols-3">
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

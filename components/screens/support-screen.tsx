"use client";

import { useObbian } from "@/components/obbian-provider";
import PopularHelpPanel from "@/components/panels/popular-help-panel";
import Button from "@/components/ui/button";
import Go from "@/components/ui/go";
import Header from "@/components/ui/header";
import Input from "@/components/ui/input";

export default function SupportScreen() {
  const { helpQuery, setHelpQuery, setContact } = useObbian();
  return (
    <>
      <Header eyebrow="Support" title="How can we help?" subtitle="Help with bookings, policies, payments and safety" />
      <Input
        aria-label="Search help articles"
        type="search"
        value={helpQuery}
        onChange={(e) => setHelpQuery(e.target.value)}
        className="!rounded-full !bg-white !px-6 !py-4 !text-base"
        placeholder="Search help articles and rental policies"
      />
      <PopularHelpPanel />
      <section className="panel mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Ask the policy assistant</h2>
          <p className="text-sm text-muted">Instant answers with sources from Obbian&apos;s policies.</p>
        </div>
        <div className="flex flex-wrap gap-3 [&>*]:!py-3">
          <Go href="/policy">Open Policy AI</Go>
          <Go href="/trips" secondary>Manage trip</Go>
          <Button secondary onClick={() => setContact(true)}>Contact options</Button>
        </div>
      </section>
    </>
  );
}

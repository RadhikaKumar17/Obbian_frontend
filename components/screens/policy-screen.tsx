"use client";

import PolicyChatPanel from "@/components/panels/policy-chat-panel";
import PolicyEvidencePanel from "@/components/panels/policy-evidence-panel";
import Header from "@/components/ui/header";

export default function PolicyScreen() {
  return (
    <>
      <Header
        title="Rental policy assistant"
        subtitle="Answers from the Obbian demo policy library"
      />
      <div className="grid gap-6 lg:grid-cols-[2.23fr_1fr]">
        <PolicyChatPanel />
        <PolicyEvidencePanel />
      </div>
    </>
  );
}

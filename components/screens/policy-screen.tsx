"use client";

import PolicyChatPanel from "@/components/panels/policy-chat-panel";
import PolicyEvidencePanel from "@/components/panels/policy-evidence-panel";
import Header from "@/components/ui/header";

export default function PolicyScreen() {
  return (
    <>
      <Header
        eyebrow="Policy assistant"
        title="Ask about our policies"
        subtitle="Answers from the Obbian demo policy library"
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <PolicyChatPanel />
        <PolicyEvidencePanel />
      </div>
    </>
  );
}

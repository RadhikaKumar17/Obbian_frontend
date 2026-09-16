"use client";

import { useObbian } from "@/components/obbian-provider";
import Panel from "@/components/ui/panel";

export default function PolicyEvidencePanel() {
  const { router, setContact, messages, booking } = useObbian();
  return (
    <Panel className="flex flex-col">
      <h2 className="text-lg font-semibold">Answer evidence</h2>
      <p className="mt-5 text-success">
        {messages.length && !messages.at(-1)?.source
          ? "No matching source"
          : "Reference available"}
      </p>
      <p className="muted mb-5 mt-9">Retrieved sources</p>
      {[
        messages.at(-1)?.source || "Cancellation Policy v1.4",
        booking ? `Booking ${booking.id}` : "No booking selected",
        "Refund Processing Guide",
      ].map((s, i) => (
        <div
          key={i}
          className="mb-4 rounded-xl bg-wash p-4 text-[13px]"
        >
          {i + 1}. {s}
        </div>
      ))}
      <p className="muted mt-6">
        This assistant searches a local demo policy library. It does
        not connect to a live AI service.
      </p>
      <div className="mt-auto pt-10">
        <button
          className="btn w-full"
          onClick={() => {
            setContact(true);
            router.push("/support");
          }}
        >
          Talk to a human
        </button>
      </div>
    </Panel>
  );
}

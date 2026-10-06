"use client";

import { useObbian } from "@/components/obbian-provider";
import { ChevronDownIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";
import { usePolicies } from "@/hooks/use-policies";

export default function PopularHelpPanel() {
  const { helpQuery, faq, setFaq } = useObbian();
  const policies = usePolicies().data ?? [];
  return (
    <Panel>
      <h2 className="mb-5 text-lg font-semibold">Popular help</h2>
      <div className="grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {policies
          .filter((p) =>
            (p.title + " " + p.answer)
              .toLowerCase()
              .includes(helpQuery.toLowerCase()),
          )
          .map((p) => (
            <div key={p.id} className={`rounded-xl border transition ${faq === p.id ? "border-tint-strong bg-tint/50" : "border-line bg-wash hover:border-tint-strong"}`}>
              <button
                onClick={() => setFaq(faq === p.id ? "" : p.id)}
                aria-expanded={faq === p.id}
                aria-controls={`faq-${p.id}`}
                className="flex w-full items-center justify-between gap-3 rounded-xl p-4 text-left text-[13px] font-medium"
              >
                {p.title}
                <ChevronDownIcon size={17} className={`shrink-0 text-brand transition-transform ${faq === p.id ? "rotate-180" : ""}`} />
              </button>
              {faq === p.id && (
                <p id={`faq-${p.id}`} className="muted px-4 pb-4">
                  {p.answer}
                </p>
              )}
            </div>
          ))}
      </div>
      {!policies.some((p) =>
        (p.title + " " + p.answer)
          .toLowerCase()
          .includes(helpQuery.toLowerCase()),
      ) && (
          <p className="muted">
            No articles found. Try “fuel”, “deposit”, or ask the policy
            assistant.
          </p>
        )}
    </Panel>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import Panel from "@/components/ui/panel";
import { usePolicies } from "@/hooks/use-policies";

export default function PopularHelpPanel() {
  const { helpQuery, faq, setFaq } = useObbian();
  const policies = usePolicies().data ?? [];
  return (
    <Panel>
      <h2 className="mb-5 text-lg font-semibold">Popular help</h2>
      <div className="grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {policies
          .filter((p) =>
            (p.title + " " + p.answer)
              .toLowerCase()
              .includes(helpQuery.toLowerCase()),
          )
          .map((p) => (
            <div key={p.id} className="rounded-xl bg-wash">
              <button
                onClick={() => setFaq(faq === p.id ? "" : p.id)}
                aria-expanded={faq === p.id}
                aria-controls={`faq-${p.id}`}
                className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px]"
              >
                {p.title}
                <span className="text-xl text-brand">
                  {faq === p.id ? "−" : "›"}
                </span>
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

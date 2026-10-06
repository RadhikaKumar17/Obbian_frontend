"use client";

import { useObbian } from "@/components/obbian-provider";
import { ChevronDownIcon } from "@/components/ui/icons";
import { usePolicies } from "@/hooks/use-policies";

export default function PopularHelpPanel() {
  const { helpQuery, faq, setFaq } = useObbian();
  const policies = usePolicies().data ?? [];
  const matches = policies.filter((p) =>
    (p.title + " " + p.answer)
      .toLowerCase()
      .includes(helpQuery.toLowerCase()),
  );
  return (
    <section aria-label="Popular help">
      <div className="mt-6 grid items-start gap-4 md:grid-cols-2">
        {matches.map((p) => (
          <div key={p.id} className={`panel !p-0 transition ${faq === p.id ? "border-brand/40" : "hover:border-brand/40"}`}>
            <button
              onClick={() => setFaq(faq === p.id ? "" : p.id)}
              aria-expanded={faq === p.id}
              aria-controls={`faq-${p.id}`}
              className="flex w-full items-center justify-between gap-3 rounded-[var(--radius-surface)] p-6 text-left"
            >
              <span className="font-display text-lg font-semibold tracking-tight">{p.title}</span>
              <ChevronDownIcon size={18} className={`shrink-0 text-brand transition-transform ${faq === p.id ? "rotate-180" : ""}`} />
            </button>
            {faq === p.id && (
              <p id={`faq-${p.id}`} className="px-6 pb-6 text-sm leading-6 text-muted">
                {p.answer}
              </p>
            )}
          </div>
        ))}
      </div>
      {!matches.length && (
        <p className="muted mt-6">
          No articles found. Try “fuel”, “deposit”, or ask the policy
          assistant.
        </p>
      )}
    </section>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import Chip from "@/components/ui/chip";
import PolicyCitations from "@/components/ui/policy-citations";
import type { RagAnswer } from "@/lib/types";

// How the RAG service resolved the question; anything but "answered" is flagged to the user.
const statusNote: Partial<Record<RagAnswer["status"], string>> = {
  abstained: "Not covered by the policy library",
  blocked: "Request declined",
  requires_backend: "Needs live booking data",
};

export default function PolicyChatPanel() {
  const { question, setQuestion, messages, asking, chatEnd, ask } = useObbian();
  return (
    <section className="panel flex min-h-[480px] min-w-0 flex-col" aria-label="Obbian Policy AI">
      <div
        className="scroll-soft -mr-2 max-h-[520px] flex-1 space-y-4 overflow-y-auto pr-2"
        role="log"
        aria-label="Policy conversation"
      >
        {messages.map((m, i) => (
          <div key={i} className="space-y-4">
            <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-tint px-4 py-2 text-sm text-brand-strong">
              {m.question}
            </div>
            <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-wash px-4 py-3 text-sm">
              {statusNote[m.status] && <p className="mb-2"><Chip tone="warn">{statusNote[m.status]}</Chip></p>}
              <p className="whitespace-pre-line leading-6">{m.answer}</p>
              <PolicyCitations citations={m.citations} />
            </div>
          </div>
        ))}
        {!messages.length && <p className="text-sm text-muted">Ask a question below. Answers include the policy passages used as evidence.</p>}
        {asking && <p role="status" className="flex items-center gap-2.5 text-sm text-muted">
          <span className="flex gap-1" aria-hidden="true">{[0, 150, 300].map(delay => <span key={delay} className="size-1.5 animate-bounce rounded-full bg-brand" style={{ animationDelay: `${delay}ms` }} />)}</span>
          Checking the policy library…
        </p>}
        <div ref={chatEnd} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "Deposit refund",
          "Insurance coverage",
          "Late-return charge",
          "Fuel policy",
        ].map((q) => (
          <button
            key={q}
            className="pill disabled:opacity-60"
            disabled={asking}
            onClick={() => ask(q)}
          >
            {q}
          </button>
        ))}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
      >
        <label htmlFor="policy-question" className="sr-only">
          Ask another policy question
        </label>
        <input
          id="policy-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about insurance, deposit, fuel or late return…"
          className="field !rounded-full !px-5"
          maxLength={2000}
          required
        />
        <button type="submit" disabled={!question.trim() || asking} className="btn shrink-0">
          Send
        </button>
      </form>
    </section>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import Chip from "@/components/ui/chip";
import { BookIcon, SendIcon, ShieldIcon, SparkleIcon } from "@/components/ui/icons";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
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
    <Panel className="flex flex-col !p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="icon-tile !size-10"><ShieldIcon size={19} /></span>
          <h2 className="text-lg font-semibold">Obbian Policy AI</h2>
        </div>
        <Chip><BookIcon size={13} />Policy knowledge base</Chip>
      </div>
      <div
        className="scroll-soft max-h-[460px] min-h-[220px] space-y-5 overflow-y-auto px-6 py-5"
        role="log"
        aria-label="Policy conversation"
      >
        {messages.map((m, i) => (
          <div key={i} className="space-y-3">
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-tint px-4 py-3 leading-6">
              {m.question}
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-tint text-brand"><SparkleIcon size={15} /></span>
              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3.5">
                {statusNote[m.status] && <p className="mb-2"><Chip tone="warn">{statusNote[m.status]}</Chip></p>}
                <p className="whitespace-pre-line leading-7">{m.answer}</p>
                <PolicyCitations citations={m.citations} />
              </div>
            </div>
          </div>
        ))}
        {!messages.length && (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="icon-tile"><BookIcon size={22} /></span>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">Ask a question below. Answers include the policy passages used as evidence.</p>
          </div>
        )}
        {asking && <p role="status" className="flex items-center gap-2.5 text-sm text-muted">
          <span className="grid size-8 place-items-center rounded-full bg-tint text-brand"><SparkleIcon size={15} /></span>
          <span className="flex gap-1" aria-hidden="true">{[0, 150, 300].map(delay => <span key={delay} className="size-1.5 animate-bounce rounded-full bg-brand" style={{ animationDelay: `${delay}ms` }} />)}</span>
          Checking the policy library…
        </p>}
        <div ref={chatEnd} />
      </div>
      <div className="border-t border-line px-6 pb-6 pt-4">
        <div className="flex flex-wrap gap-2">
          {[
            "Deposit refund",
            "Insurance coverage",
            "Late-return charge",
            "Fuel policy",
          ].map((q) => (
            <button
              key={q}
              className="chip w-fit text-left transition hover:bg-tint-strong disabled:opacity-60"
              disabled={asking}
              onClick={() => ask(q)}
            >
              {q}
            </button>
          ))}
        </div>
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
        >
          <label htmlFor="policy-question" className="text-[13px] font-medium">
            Ask another policy question
          </label>
          <div className="mt-2 flex gap-2">
            <Input
              id="policy-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about insurance, deposit, fuel or late return…"
              className="!bg-wash"
              maxLength={2000}
              required
            />
            <button type="submit" disabled={!question.trim() || asking} className="btn shrink-0">
              Send <SendIcon size={16} />
            </button>
          </div>
        </form>
      </div>
    </Panel>
  );
}

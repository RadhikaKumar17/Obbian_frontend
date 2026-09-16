"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { policies } from "@/lib/data";

export default function PolicyChatPanel() {
  const { router, setFaq, question, setQuestion, messages, asking, chatEnd, ask } = useObbian();
  return (
    <Panel>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">✦ Obbian Policy AI</h2>
        <Chip>Demo knowledge base</Chip>
      </div>
      <div
        className="mt-6 max-h-[390px] space-y-6 overflow-y-auto pr-1"
        role="log"
        aria-label="Policy conversation"
      >
        <div className="ml-5 rounded-2xl bg-tint p-[18px] sm:ml-24">
          What happens if I cancel tomorrow’s booking?
        </div>
        <div className="rounded-2xl bg-wash p-[18px]">
          <p className="leading-7">{policies[0].answer}</p>
          <button
            onClick={() => {
              setFaq("cancellation");
              router.push("/support");
            }}
            className="chip mt-6 text-left"
          >
            [1] Cancellation Policy · Demo reference
          </button>
        </div>
        {messages.map((m, i) => (
          <div key={i} className="space-y-4">
            <div className="ml-5 rounded-2xl bg-tint p-[18px] sm:ml-24">
              {m.question}
            </div>
            <div className="rounded-2xl bg-wash p-[18px]">
              <p className="leading-7">{m.answer}</p>
              {m.source && (
                <p className="chip mt-5">[1] {m.source}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEnd} />
      </div>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
      >
        <label htmlFor="policy-question" className="muted">
          Ask another policy question
        </label>
        <Input
          id="policy-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about insurance, deposit, fuel or late return…"
          className="field mt-3"
          maxLength={500}
          required
        />
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={!question.trim() || asking}>
            Send
          </Button>
        </div>
      </form>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          "Deposit refund",
          "Insurance coverage",
          "Late-return charge",
          "Fuel policy",
        ].map((q) => (
          <button
            key={q}
            className="chip w-fit text-left hover:bg-blue-100"
            onClick={() => ask(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </Panel>
  );
}

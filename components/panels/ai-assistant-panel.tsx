"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";
import { dateLabel, money } from "@/lib/data";

export default function AiAssistantPanel() {
  const { date, budget, results } = useObbian();
  return (
    <Panel className="flex min-h-[330px] flex-col">
      <h2 className="text-lg font-semibold">✦ Obbian AI Assistant</h2>
      <div className="ml-0 mt-7 rounded-2xl bg-tint p-[18px] text-[13px] sm:ml-16">
        Find me an automatic SUV near me for{" "}
        {dateLabel(date).toLowerCase()} under {money(Number(budget))}
        /day.
      </div>
      <p className="mt-6 font-medium">
        {results.length
          ? `I found ${results.length} available SUV${results.length === 1 ? "" : "s"} nearby. ${results[0].name} is the best match`
          : "No vehicles match these filters. Try a larger radius or daily budget."}
      </p>
      <p className="muted mt-2">
        based on distance, rating and price.
      </p>
      <div className="mt-auto flex justify-end pt-8">
        <Go href="/search">Search vehicles →</Go>
      </div>
    </Panel>
  );
}

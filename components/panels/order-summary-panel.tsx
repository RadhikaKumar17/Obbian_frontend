"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Go from "@/components/ui/go";
import { ShieldIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";
import { useRentalQuote } from "@/hooks/use-assistant";
import { dateLabel, money } from "@/lib/data";

export default function OrderSummaryPanel() {
  const { date, car, config, reserving } = useObbian();
  const quote = useRentalQuote(car?.id ?? "", date);
  const insuranceFee = quote.data?.insurance ?? 0;
  return (
    <Panel className="h-fit">
      <h2 className="text-xl font-semibold">{car?.name}</h2>
      <p className="muted mt-1.5">
        {dateLabel(date)} · {config?.timeLabel}
      </p>
      <div className="my-6 space-y-3.5 rounded-xl bg-wash p-4 text-sm">
        <p className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-muted">
          <span>Rental {money(quote.data?.rental ?? 0)}</span>
          <span>+ Insurance {money(insuranceFee)}</span>
        </p>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-3.5 text-lg font-semibold">
          <span>Payable total</span>
          <span>{quote.data ? money(quote.data.total) : "Checking…"}</span>
        </div>
      </div>
      {quote.isError && <p role="alert" className="alert mb-4">Could not load the current quote. <button type="button" className="underline" onClick={() => void quote.refetch()}>Try again</button></p>}
      {quote.data && !quote.data.available && <p role="alert" className="alert mb-4">This vehicle is unavailable on the selected date.</p>}
      <div className="flex flex-col gap-3">
        <Button type="submit" disabled={!quote.data?.available || quote.isFetching || reserving}>
          {reserving ? "Confirming…" : "Confirm reservation"}
        </Button>
        <Go href="/vehicle" secondary>
          Back
        </Go>
      </div>
      <p className="muted mt-5 flex gap-2"><ShieldIcon size={16} className="mt-0.5 shrink-0 text-brand" /><span>
        Payment is collected at pickup. Review the rental terms before confirming.</span>
      </p>
    </Panel>
  );
}

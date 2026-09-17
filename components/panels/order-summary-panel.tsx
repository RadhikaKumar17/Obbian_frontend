"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";
import { useRentalQuote } from "@/hooks/use-assistant";
import { dateLabel, money } from "@/lib/data";

export default function OrderSummaryPanel() {
  const { date, car, config, reserving } = useObbian();
  const quote = useRentalQuote(car?.id ?? "", date);
  const insuranceFee = quote.data?.insurance ?? 0;
  return (
    <Panel>
      <h2 className="text-xl font-semibold">{car?.name}</h2>
      <p className="muted mt-3">
        {dateLabel(date)} · {config?.timeLabel}
      </p>
      <p className="mt-12">
        Rental {money(quote.data?.rental ?? 0)} + Insurance {money(insuranceFee)}
      </p>
      <div className="my-10 flex flex-wrap justify-between gap-3 text-lg font-semibold">
        <span>Payable total</span>
        <span>{quote.data ? money(quote.data.total) : "Checking…"}</span>
      </div>
      {quote.isError && <p role="alert" className="mb-4 text-sm text-red-700">Could not load the current quote. <button type="button" className="underline" onClick={() => void quote.refetch()}>Try again</button></p>}
      {quote.data && !quote.data.available && <p role="alert" className="mb-4 text-sm text-red-700">This vehicle is unavailable on the selected date.</p>}
      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={!quote.data?.available || quote.isFetching || reserving}>
          {reserving ? "Confirming…" : "Confirm reservation"}
        </Button>
        <Go href="/vehicle" secondary>
          Back
        </Go>
      </div>
      <p className="muted mt-6">
        Payment is collected at pickup. Review the rental terms before confirming.
      </p>
    </Panel>
  );
}

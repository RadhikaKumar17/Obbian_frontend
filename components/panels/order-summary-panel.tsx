"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import CarVisual from "@/components/ui/car-visual";
import Go from "@/components/ui/go";
import { useRentalQuote } from "@/hooks/use-assistant";
import { dateLabel, money } from "@/lib/data";
import { vehiclePaint, vehiclePhotos } from "@/lib/vehicle-images";

export default function OrderSummaryPanel() {
  const { date, car, config, reserving } = useObbian();
  const quote = useRentalQuote(car?.id ?? "", date);
  const insuranceFee = quote.data?.insurance ?? 0;
  return (
    <aside className="panel h-fit overflow-hidden !p-0 lg:sticky lg:top-8">
      {car && <CarVisual photos={vehiclePhotos(car)} name={car.name} paint={vehiclePaint(car.id)} category={car.category} className="aspect-[16/9] w-full border-b border-line" />}
      <div className="p-6">
        <h3 className="text-lg font-semibold">{car?.name}</h3>
        <p className="text-sm text-muted">
          {dateLabel(date)} · {config?.timeLabel}
          {car ? ` · ${car.pickup}` : ""}
        </p>
        <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <p className="flex justify-between text-muted">
            <span>Rental {money(quote.data?.rental ?? 0)}</span>
            <span>+ Insurance {money(insuranceFee)}</span>
          </p>
          <div className="flex justify-between text-base font-semibold">
            <span>Payable total</span>
            <span className="text-brand">{quote.data ? money(quote.data.total) : "Checking…"}</span>
          </div>
        </div>
        {quote.isError && <p role="alert" className="alert mt-4">Could not load the current quote. <button type="button" className="underline" onClick={() => void quote.refetch()}>Try again</button></p>}
        {quote.data && !quote.data.available && <p role="alert" className="alert mt-4">This vehicle is unavailable on the selected date.</p>}
        <div className="mt-5 flex flex-col gap-2 [&>*]:!py-3">
          <Button type="submit" disabled={!quote.data?.available || quote.isFetching || reserving}>
            {reserving ? "Confirming…" : "Confirm reservation"}
          </Button>
          <Go href="/vehicle" secondary>
            Back
          </Go>
        </div>
        <p className="muted mt-4">
          Payment is collected at pickup. Review the rental terms before confirming.
        </p>
      </div>
    </aside>
  );
}

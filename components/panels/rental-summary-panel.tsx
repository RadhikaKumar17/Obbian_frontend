"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import { HeartIcon } from "@/components/ui/icons";
import Input from "@/components/ui/input";
import { localDate, money, tomorrow } from "@/lib/data";

export default function RentalSummaryPanel() {
  const { date, setDate, car, config, saved, toggleSave } = useObbian();
  const insuranceFee = config?.insuranceFee ?? 0;
  const isSaved = car ? saved.includes(car.id) : false;
  return (
    <section className="panel h-fit lg:sticky lg:top-8" aria-labelledby="rental-summary">
      <h2 id="rental-summary" className="sr-only">Rental summary</h2>
      <p className="font-display text-3xl font-bold">
        {money(car?.price ?? 0)}
        <span className="font-sans text-sm font-normal text-muted"> /day</span>
      </p>
      <label className="mt-5 block">
        <span className="text-xs text-muted">Pickup date</span>
        <Input
          className="mt-1"
          type="date"
          min={localDate()}
          value={date}
          onChange={(e) => setDate(e.target.value || tomorrow())}
        />
      </label>
      <p className="muted mt-2">{config?.timeLabel}</p>
      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between text-muted">
          <span>Rental</span>
          <span>{money(car?.price ?? 0)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Insurance</span>
          <span>{money(insuranceFee)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-2 font-semibold">
          <span>Total</span>
          <span>{money((car?.price ?? 0) + insuranceFee)}</span>
        </div>
      </div>
      <div className="mt-6 [&>a]:w-full [&>a]:!py-3">
        {car?.available ? (
          <Go href="/checkout">Reserve vehicle →</Go>
        ) : (
          <>
            <p className="alert mb-4">
              This vehicle is unavailable on the selected date. Choose
              another vehicle to continue.
            </p>
            <Go href="/search">Browse available vehicles</Go>
          </>
        )}
      </div>
      {car && (
        <button
          className="btn btn-secondary mt-2 w-full !py-3"
          aria-pressed={isSaved}
          onClick={() => toggleSave(car.id)}
        >
          <HeartIcon size={17} filled={isSaved} className={isSaved ? "text-brand" : ""} />
          {isSaved ? "Saved to favourites" : "Save vehicle"}
        </button>
      )}
    </section>
  );
}

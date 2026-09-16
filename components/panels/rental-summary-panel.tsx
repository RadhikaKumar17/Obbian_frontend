"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { localDate, money, tomorrow } from "@/lib/data";

export default function RentalSummaryPanel() {
  const { date, setDate, car, config } = useObbian();
  const insuranceFee = config?.insuranceFee ?? 0;
  return (
    <Panel>
      <h2 className="text-xl font-semibold">Rental summary</h2>
      <label className="mt-5 block">
        <span className="muted">Pickup date</span>
        <Input
          className="mt-2"
          type="date"
          min={localDate()}
          value={date}
          onChange={(e) => setDate(e.target.value || tomorrow())}
        />
      </label>
      <p className="muted mt-3">{config?.timeLabel}</p>
      <div className="my-6 space-y-5">
        <div className="flex justify-between">
          <span>Rental</span>
          <span>{money(car?.price ?? 0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Insurance</span>
          <span>{money(insuranceFee)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-5 text-lg font-semibold">
          <span>Total</span>
          <span>{money((car?.price ?? 0) + insuranceFee)}</span>
        </div>
      </div>
      {car?.available ? (
        <div className="[&>a]:w-full">
          <Go href="/checkout">Reserve vehicle →</Go>
        </div>
      ) : (
        <>
          <p className="muted mb-4">
            This vehicle is unavailable on the selected date. Choose
            another vehicle to continue.
          </p>
          <Go href="/search">Browse available vehicles</Go>
        </>
      )}
    </Panel>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import { ArrowRightIcon } from "@/components/ui/icons";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { localDate, money, tomorrow } from "@/lib/data";

export default function RentalSummaryPanel() {
  const { date, setDate, car, config } = useObbian();
  const insuranceFee = config?.insuranceFee ?? 0;
  return (
    <Panel className="h-fit">
      <h2 className="text-xl font-semibold">Rental summary</h2>
      <label className="mt-5 block">
        <span className="text-[13px] font-medium">Pickup date</span>
        <Input
          className="mt-2"
          type="date"
          min={localDate()}
          value={date}
          onChange={(e) => setDate(e.target.value || tomorrow())}
        />
      </label>
      <p className="muted mt-3">{config?.timeLabel}</p>
      <div className="my-6 space-y-3.5 rounded-xl bg-wash p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Rental</span>
          <span>{money(car?.price ?? 0)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Insurance</span>
          <span>{money(insuranceFee)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-3.5 text-lg font-semibold">
          <span>Total</span>
          <span>{money((car?.price ?? 0) + insuranceFee)}</span>
        </div>
      </div>
      {car?.available ? (
        <div className="[&>a]:w-full">
          <Go href="/checkout">Reserve vehicle <ArrowRightIcon size={16} /></Go>
        </div>
      ) : (
        <>
          <p className="alert mb-4">
            This vehicle is unavailable on the selected date. Choose
            another vehicle to continue.
          </p>
          <Go href="/search">Browse available vehicles</Go>
        </>
      )}
    </Panel>
  );
}

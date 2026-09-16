"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { localDate, money, tomorrow } from "@/lib/data";

export default function RentalSummaryPanel() {
  const { date, setDate, car } = useObbian();
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
      <p className="muted mt-3">10:00 AM – 8:00 PM</p>
      <div className="my-6 space-y-5">
        <div className="flex justify-between">
          <span>Rental</span>
          <span>{money(car.price)}</span>
        </div>
        <div className="flex justify-between">
          <span>Insurance</span>
          <span>₹249</span>
        </div>
        <div className="flex justify-between border-t border-line pt-5 text-lg font-semibold">
          <span>Total</span>
          <span>{money(car.price + 249)}</span>
        </div>
      </div>
      {car.available ? (
        <div className="[&>a]:w-full">
          <Go href="/checkout">Reserve vehicle →</Go>
        </div>
      ) : (
        <>
          <p className="muted mb-4">
            This vehicle is unavailable in the demo inventory. Choose
            another vehicle to continue.
          </p>
          <Go href="/search">Browse available vehicles</Go>
        </>
      )}
    </Panel>
  );
}

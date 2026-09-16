"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";
import { dateLabel, money } from "@/lib/data";

export default function OrderSummaryPanel() {
  const { date, car } = useObbian();
  return (
    <Panel>
      <h2 className="text-xl font-semibold">{car.name}</h2>
      <p className="muted mt-3">
        {dateLabel(date)} · 10:00 AM – 8:00 PM
      </p>
      <p className="mt-12">
        Rental {money(car.price)} + Insurance ₹249
      </p>
      <div className="my-10 flex flex-wrap justify-between gap-3 text-lg font-semibold">
        <span>Payable total</span>
        <span>{money(car.price + 249)}</span>
      </div>
      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={!car.available}>
          Confirm reservation
        </Button>
        <Go href="/vehicle" secondary>
          Back
        </Go>
      </div>
      <p className="muted mt-6">
        Demo checkout — no payment is collected. Use sample details.
      </p>
    </Panel>
  );
}

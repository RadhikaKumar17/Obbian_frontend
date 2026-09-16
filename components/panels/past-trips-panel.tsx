"use client";

import { useObbian } from "@/components/obbian-provider";
import Panel from "@/components/ui/panel";
import { dateLabel, money } from "@/lib/data";

export default function PastTripsPanel() {
  const { bookings, receipt } = useObbian();
  return (
    <Panel className="h-fit">
      <h2 className="mb-5 text-lg font-semibold">Past trips</h2>
      <div className="space-y-5">
        {bookings
          .filter((b) => b.status === "Completed")
          .map((b) => (
            <div key={b.id} className="rounded-xl bg-wash p-4">
              <p className="font-medium">{b.vehicleName}</p>
              <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs">
                <span className="text-muted">
                  {dateLabel(b.date)} · {money(b.total)}
                </span>
                <button
                  className="font-medium text-brand"
                  onClick={() => receipt(b)}
                >
                  Receipt →
                </button>
              </div>
            </div>
          ))}
      </div>
    </Panel>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import { ArrowRightIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";
import { dateLabel, money } from "@/lib/data";

export default function PastTripsPanel() {
  const { bookings, receipt } = useObbian();
  const past = bookings.filter((b) => b.status === "Completed");
  return (
    <Panel className="h-fit">
      <h2 className="mb-4 text-lg font-semibold">Past trips</h2>
      <div className="space-y-3">
        {past.map((b) => (
          <div key={b.id} className="rounded-xl border border-line bg-wash p-4">
            <p className="font-medium">{b.vehicleName}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-muted">
                {dateLabel(b.date)} · {money(b.total)}
              </span>
              <button
                className="link inline-flex items-center gap-1"
                onClick={() => receipt(b)}
              >
                Receipt <ArrowRightIcon size={13} />
              </button>
            </div>
          </div>
        ))}
        {!past.length && <p className="muted">Completed trips and their receipts will appear here.</p>}
      </div>
    </Panel>
  );
}

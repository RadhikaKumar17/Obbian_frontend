"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import Panel from "@/components/ui/panel";
import type { Booking } from "@/lib/data";
import { dateLabel } from "@/lib/data";

export default function TripPanel({ b }: { b: Booking }) {
  const { router, setSelectedBooking, setManage, setNewDate, receipt, completeBooking, completing, setToast } = useObbian();
  return (
    <Panel>
      <div className="flex gap-5 sm:gap-8">
        <span
          className="text-5xl"
          role="img"
          aria-label="SUV"
        >
          🚙
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[22px] font-semibold">
            {b.vehicleName}
          </h2>
          <div className="mt-3">
            <Chip>{b.status}</Chip>
          </div>
          <p className="mt-6">
            {dateLabel(b.date)} · {b.timeLabel}
          </p>
          <p className="muted mt-3">
            {b.pickup} · Booking {b.id}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            {["Confirmed", "Active"].includes(b.status) ? (
              <>
                <Button
                  onClick={() => {
                    setSelectedBooking(b.id);
                    router.push("/tracking");
                  }}
                >
                  Track vehicle
                </Button>
                {b.status === "Confirmed" ? (
                  <Button
                    secondary
                    onClick={() => {
                      setManage(b);
                      setNewDate(b.date);
                    }}
                  >
                    Manage booking
                  </Button>
                ) : (
                  <Button
                    secondary
                    disabled={completing}
                    onClick={() => {
                      completeBooking(b.id)
                        .then(() => setToast("Trip completed"))
                        .catch((error) => setToast(error instanceof Error ? error.message : "Something went wrong."));
                    }}
                  >
                    {completing ? "Completing…" : "Complete trip"}
                  </Button>
                )}
              </>
            ) : (
              <Button secondary onClick={() => receipt(b)}>
                Download receipt
              </Button>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}

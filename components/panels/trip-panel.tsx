"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Chip, { type ChipTone } from "@/components/ui/chip";
import { CalendarIcon, CarIcon, PinIcon, ReceiptIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";
import type { Booking } from "@/lib/data";
import { dateLabel, money } from "@/lib/data";

const statusTone: Record<Booking["status"], ChipTone> = {
  Confirmed: "brand",
  Active: "success",
  Completed: "neutral",
  Cancelled: "danger",
};

export default function TripPanel({ b }: { b: Booking }) {
  const { router, setSelectedBooking, setManage, setNewDate, receipt, completeBooking, completing, setToast } = useObbian();
  return (
    <Panel>
      <div className="flex gap-4 sm:gap-5">
        <span className="icon-tile !size-14 !rounded-2xl">
          <CarIcon size={26} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold">
                {b.vehicleName}
              </h2>
              <p className="muted mt-0.5">Booking {b.id}</p>
            </div>
            <Chip tone={statusTone[b.status]}>{b.status}</Chip>
          </div>
          <dl className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2.5">
              <CalendarIcon size={17} className="shrink-0 text-brand" />
              <dt className="sr-only">Pickup time</dt>
              <dd>{dateLabel(b.date)} · {b.timeLabel}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <PinIcon size={17} className="shrink-0 text-brand" />
              <dt className="sr-only">Pickup location</dt>
              <dd className="truncate">{b.pickup}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <ReceiptIcon size={17} className="shrink-0 text-brand" />
              <dt className="sr-only">Total</dt>
              <dd>{money(b.total)} · {b.paymentStatus}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-5">
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

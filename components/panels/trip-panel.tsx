"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import Panel from "@/components/ui/panel";
import type { Booking, Vehicle } from "@/lib/data";
import { dateLabel } from "@/lib/data";

export default function TripPanel({ b, v }: { b: Booking; v: Vehicle }) {
  const { router, setSelectedBooking, setManage, setNewDate, setDistance, setPaused, receipt } = useObbian();
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
            {v.name}
          </h2>
          <div className="mt-3">
            <Chip>{b.status}</Chip>
          </div>
          <p className="mt-6">
            {dateLabel(b.date)} · 10:00 AM – 8:00 PM
          </p>
          <p className="muted mt-3">
            Connaught Place · Booking {b.id}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            {["Confirmed", "Active"].includes(b.status) ? (
              <>
                <Button
                  onClick={() => {
                    setSelectedBooking(b.id);
                    setDistance(2.1);
                    setPaused(false);
                    router.push("/tracking");
                  }}
                >
                  Track vehicle
                </Button>
                <Button
                  secondary
                  onClick={() => {
                    setManage(b);
                    setNewDate(b.date);
                  }}
                >
                  Manage booking
                </Button>
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

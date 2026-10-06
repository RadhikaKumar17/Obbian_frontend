"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import Go from "@/components/ui/go";
import { CalendarIcon, ClockIcon, PinIcon, RouteIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";
import { dateLabel } from "@/lib/data";

export default function ActiveTripPanel() {
  const { date, tracking, booking, bookedCar, config, completeBooking, completing, setToast, router } = useObbian();
  return (
    <Panel className="flex flex-col">
      <h2 className="text-xl font-semibold">{bookedCar?.name}</h2>
      <div className="mt-3">
        <Chip tone={booking?.status === "Active" ? "success" : "brand"}>
          <span className="size-1.5 animate-pulse rounded-full bg-current" aria-hidden="true" />
          {booking?.status === "Active" ? "Trip in progress" : (tracking?.status ?? "Awaiting location")}
        </Chip>
      </div>
      {(tracking?.etaMinutes != null || tracking?.distance != null) && (
        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-wash p-3.5">
            <dt className="muted flex items-center gap-1.5 !text-xs"><ClockIcon size={14} />ETA</dt>
            <dd className="mt-1 text-lg font-semibold">{tracking.etaMinutes != null ? `${tracking.etaMinutes} min` : "—"}</dd>
          </div>
          <div className="rounded-xl bg-wash p-3.5">
            <dt className="muted flex items-center gap-1.5 !text-xs"><RouteIcon size={14} />Distance</dt>
            <dd className="mt-1 text-lg font-semibold">{tracking.distance != null ? `${tracking.distance} km` : "—"}</dd>
          </div>
        </dl>
      )}
      <p className="mt-6 flex items-start gap-2.5 text-sm">
        <CalendarIcon size={18} className="mt-0.5 shrink-0 text-brand" />
        <span>
          Pickup{" "}
          {booking ? dateLabel(booking.date).toLowerCase() : dateLabel(date).toLowerCase()}
          {config ? `, ${config.pickupTime}` : ""}
        </span>
      </p>
      <p className="mt-4 flex items-start gap-2.5 text-sm">
        <PinIcon size={18} className="mt-0.5 shrink-0 text-brand" />
        <span>{booking?.pickup ?? bookedCar?.pickup}</span>
      </p>
      <div className="mt-auto flex flex-col gap-3 pt-10">
        {booking?.status === "Active" && (
          <Button
            onClick={() => {
              completeBooking(booking.id)
                .then(() => {
                  setToast("Trip completed");
                  router.push("/trips");
                })
                .catch((error) => setToast(error instanceof Error ? error.message : "Something went wrong."));
            }}
            disabled={completing}
          >
            {completing ? "Completing…" : "Complete trip"}
          </Button>
        )}
        <Go href="/support">Contact support</Go>
        <Go href="/" secondary>
          Back to Discover
        </Go>
      </div>
    </Panel>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Go from "@/components/ui/go";
import { dateLabel } from "@/lib/data";

export default function ActiveTripPanel() {
  const { date, tracking, booking, config, bookedCar, completeBooking, completing, setToast, router } = useObbian();
  const stats = [
    ["Status", booking?.status === "Active" ? "Trip in progress" : (tracking?.status ?? "Awaiting location")],
    ["ETA", tracking?.etaMinutes != null ? `${tracking.etaMinutes} min` : "—"],
    ["Distance", tracking?.distance != null ? `${tracking.distance} km` : "—"],
  ];
  return (
    <div className="space-y-3">
      {stats.map(([label, value]) => (
        <div key={label} className="panel !p-5">
          <p className="text-xs text-muted">{label}</p>
          <p className={`mt-1 font-display font-bold ${label === "Status" ? "text-xl" : "text-3xl"}`}>{value}</p>
        </div>
      ))}
      <div className="panel !p-5">
        <p className="text-xs text-muted">Pickup</p>
        <p className="mt-1 font-semibold">
          {booking ? dateLabel(booking.date) : dateLabel(date)}
          {config ? `, ${config.pickupTime}` : ""}
        </p>
        <p className="mt-0.5 text-sm text-muted">{booking?.pickup ?? bookedCar?.pickup}</p>
      </div>
      <div className="flex flex-col gap-2 pt-1 [&>*]:!py-3">
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
        <Go href="/support" secondary>Contact support</Go>
        <Go href="/" secondary>
          Back to Discover
        </Go>
      </div>
    </div>
  );
}

"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";
import { dateLabel } from "@/lib/data";

export default function ActiveTripPanel() {
  const { date, tracking, booking, bookedCar, config, completeBooking, completing, setToast, router } = useObbian();
  return (
    <Panel className="flex flex-col">
      <h2 className="text-xl font-semibold">{bookedCar?.name}</h2>
      <div className="mt-5">
        <Chip>{booking?.status === "Active" ? "Trip in progress" : (tracking?.status ?? "Awaiting location")}</Chip>
      </div>
      <p className="mt-8">
        Pickup{" "}
        {booking ? dateLabel(booking.date).toLowerCase() : dateLabel(date).toLowerCase()}
        {config ? `, ${config.pickupTime}` : ""}
      </p>
      <p className="mt-8">{booking?.pickup ?? bookedCar?.pickup}</p>
      <div className="mt-auto flex flex-col gap-4 pt-12">
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

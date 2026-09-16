"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";
import { dateLabel } from "@/lib/data";

export default function ActiveTripPanel() {
  const { date, distance, setDistance, paused, setPaused, booking, bookedCar } = useObbian();
  return (
    <Panel className="flex flex-col">
      <h2 className="text-xl font-semibold">{bookedCar.name}</h2>
      <div className="mt-5">
        <Chip>
          {distance === 0 ? "Vehicle arrived" : "Driver en route"}
        </Chip>
      </div>
      <p className="mt-8">
        Pickup{" "}
        {booking
          ? dateLabel(booking.date).toLowerCase()
          : dateLabel(date).toLowerCase()}
        , 10:00 AM
      </p>
      <p className="mt-8">
        Rajiv Chowk ·{" "}
        {distance === 0 ? "arrived" : paused ? "paused" : "moving"}
      </p>
      <div className="mt-6">
        <Button
          secondary
          onClick={() => {
            if (distance === 0) setDistance(2.1);
            setPaused(!paused);
          }}
        >
          {paused ? "Resume tracking" : "Pause tracking"}
        </Button>
      </div>
      <div className="mt-auto flex flex-col gap-4 pt-12">
        <Go href="/support">Contact support</Go>
        <Go href="/" secondary>
          Back to Discover
        </Go>
      </div>
    </Panel>
  );
}

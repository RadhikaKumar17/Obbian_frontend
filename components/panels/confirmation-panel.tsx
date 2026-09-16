"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";
import { dateLabel, money } from "@/lib/data";

export default function ConfirmationPanel() {
  const { booking, bookedCar } = useObbian();
  if (!booking) return null;
  return (
    <Panel className="mx-auto mt-12 max-w-[880px] py-10 text-center">
      <div className="text-[72px] text-success">✓</div>
      <h2 className="mt-5 text-2xl font-semibold">
        Booking {booking.id} {booking.status.toLowerCase()}
      </h2>
      <p className="mt-5 text-[15px]">
        {bookedCar.name} · {dateLabel(booking.date)} · 10:00 AM
      </p>
      <p className="my-12">
        Pickup: Connaught Place, New Delhi{" "}
        <span className="ml-5 font-semibold">
          {money(booking.total)} · demo payment
        </span>
      </p>
      <div className="flex flex-wrap justify-center gap-5">
        <Go href="/tracking">Track vehicle live →</Go>
        <Go href="/trips" secondary>
          View My Trips
        </Go>
      </div>
    </Panel>
  );
}

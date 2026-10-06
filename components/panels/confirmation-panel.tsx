"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";
import { dateLabel, money } from "@/lib/data";

export default function ConfirmationPanel() {
  const { booking, bookedCar } = useObbian();
  if (!booking) return null;
  return (
    <Panel className="mx-auto mt-6 max-w-[760px] !p-8 text-center sm:!p-10">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-success/10 text-success ring-8 ring-success/5">
        <CheckIcon size={40} strokeWidth={2.25} />
      </div>
      <h2 className="mt-6 text-2xl font-semibold">
        Booking {booking.id} {booking.status.toLowerCase()}
      </h2>
      <p className="mt-2 text-[15px] text-muted">
        {bookedCar?.name} · {dateLabel(booking.date)} · {booking.timeLabel}
      </p>
      <dl className="mx-auto my-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
        <div className="rounded-xl bg-wash p-4">
          <dt className="muted">Pickup</dt>
          <dd className="mt-1 font-medium">{booking.pickup}</dd>
        </div>
        <div className="rounded-xl bg-wash p-4">
          <dt className="muted">Total</dt>
          <dd className="mt-1 font-semibold">
            {money(booking.total)} · {booking.paymentStatus}
          </dd>
        </div>
      </dl>
      <div className="flex flex-wrap justify-center gap-3">
        <Go href="/tracking">Track vehicle live <ArrowRightIcon size={16} /></Go>
        <Go href="/trips" secondary>
          View My Trips
        </Go>
      </div>
    </Panel>
  );
}

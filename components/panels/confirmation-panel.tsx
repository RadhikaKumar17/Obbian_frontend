"use client";

import { useObbian } from "@/components/obbian-provider";
import CarVisual from "@/components/ui/car-visual";
import Go from "@/components/ui/go";
import { CheckIcon } from "@/components/ui/icons";
import { dateLabel, money } from "@/lib/data";
import { vehiclePaint, vehiclePhotos } from "@/lib/vehicle-images";

export default function ConfirmationPanel() {
  const { booking, bookedCar } = useObbian();
  if (!booking) return null;
  return (
    <div className="mx-auto max-w-xl pt-6 text-center md:pt-10">
      <div className="mx-auto grid size-20 place-items-center rounded-full bg-brand text-white shadow-glow">
        <CheckIcon size={36} strokeWidth={2.5} />
      </div>
      <h1 className="mt-6 text-4xl font-bold">You&apos;re all set!</h1>
      <p className="mt-2 text-base text-muted">
        Booking <span className="font-medium text-ink">{booking.id}</span> {booking.status.toLowerCase()}
      </p>
      <div className="panel mt-8 overflow-hidden !p-0 text-left">
        {bookedCar && <CarVisual photos={vehiclePhotos(bookedCar)} name={bookedCar.name} paint={vehiclePaint(bookedCar.id)} category={bookedCar.category} className="aspect-[16/8] w-full border-b border-line" />}
        <dl className="grid grid-cols-2 gap-4 p-6 text-sm">
          <div><dt className="text-muted">Car</dt><dd className="font-semibold">{bookedCar?.name ?? booking.vehicleName}</dd></div>
          <div><dt className="text-muted">Pickup</dt><dd className="font-semibold">{booking.pickup}</dd></div>
          <div><dt className="text-muted">When</dt><dd className="font-semibold">{dateLabel(booking.date)} · {booking.timeLabel}</dd></div>
          <div><dt className="text-muted">Total</dt><dd className="font-semibold">{money(booking.total)} · {booking.paymentStatus}</dd></div>
        </dl>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3 [&>a]:!px-8 [&>a]:!py-3">
        <Go href="/tracking">Track vehicle live →</Go>
        <Go href="/trips" secondary>
          View My Trips
        </Go>
      </div>
    </div>
  );
}

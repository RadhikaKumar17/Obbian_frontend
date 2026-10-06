"use client";

import { useObbian } from "@/components/obbian-provider";
import Chip from "@/components/ui/chip";
import { CheckIcon } from "@/components/ui/icons";
import Link from "next/link";

export default function VehicleDetailsPanel() {
  const { car, config } = useObbian();
  if (!car) return null;
  return (
    <div className="min-w-0">
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Transmission", car.transmission],
          ["Seats", String(car.seats)],
          ["Fuel", car.fuel],
          ["Distance", `${car.distance} km`],
        ].map(([label, value]) => (
          <div key={label} className="panel !p-4">
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-1 truncate font-display text-lg font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <section className="panel mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Pickup</h2>
          <Chip tone={car.available ? "success" : "neutral"}>{car.available ? "Available" : "Currently unavailable"}</Chip>
        </div>
        <p className="mt-1 text-base text-muted">
          Pickup: {car.pickup}
          {config ? ` · ${config.timeLabel}` : ""}
        </p>
        <h2 className="mt-6 text-xl font-semibold">Good to know</h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <li className="flex items-center gap-2"><CheckIcon size={15} className="shrink-0 text-brand" /> {car.category} · {car.seats} seats</li>
          <li className="flex items-center gap-2"><CheckIcon size={15} className="shrink-0 text-brand" /> {car.trips}+ trips completed</li>
          <li className="flex items-center gap-2"><CheckIcon size={15} className="shrink-0 text-brand" /> Insurance added at checkout</li>
          <li className="flex items-center gap-2"><CheckIcon size={15} className="shrink-0 text-brand" /> <Link href="/policy" className="link">Cancellation and fuel policy</Link></li>
        </ul>
      </section>
    </div>
  );
}

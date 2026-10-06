"use client";

import { useObbian } from "@/components/obbian-provider";
import CarVisual from "@/components/ui/car-visual";
import Chip from "@/components/ui/chip";
import { CarIcon, FuelIcon, GearboxIcon, HeartIcon, PinIcon, SeatsIcon, StarIcon } from "@/components/ui/icons";
import Panel from "@/components/ui/panel";
import { vehiclePaint, vehiclePhoto } from "@/lib/vehicle-images";

export default function VehicleDetailsPanel() {
  const { saved, car, toggleSave } = useObbian();
  if (!car) return null;
  const isSaved = saved.includes(car.id);
  return (
    <Panel>
      <CarVisual large src={vehiclePhoto(car)} name={car.name} paint={vehiclePaint(car.id)} category={car.category} />
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Chip tone={car.available ? "success" : "neutral"}>{car.available ? "Available" : "Currently unavailable"}</Chip>
        <span className="flex items-center gap-1.5">
          <StarIcon size={15} className="text-amber-500" />
          <span className="font-semibold">{car.rating}</span>
          <span className="text-muted">· {car.trips}+ trips · {car.distance} km away</span>
        </span>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4" aria-label="Vehicle features">
        {[
          [GearboxIcon, "Transmission", car.transmission],
          [CarIcon, "Category", car.category],
          [SeatsIcon, "Seats", `${car.seats} seats`],
          [FuelIcon, "Fuel", car.fuel],
        ].map(([Icon, label, value]) => {
          const FeatureIcon = Icon as typeof CarIcon;
          return (
            <li key={label as string} className="rounded-xl bg-wash p-3.5">
              <FeatureIcon size={18} className="text-brand" />
              <p className="muted mt-2 !text-xs">{label as string}</p>
              <p className="font-medium">{value as string}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 flex items-center gap-2.5 rounded-xl border border-line p-3.5 text-sm">
        <PinIcon size={18} className="shrink-0 text-brand" />
        <span>Pickup: {car.pickup}</span>
      </p>
      <button
        className={`mt-5 inline-flex items-center gap-2 rounded-lg text-sm font-medium transition hover:text-brand-strong ${isSaved ? "text-brand" : "text-muted"}`}
        aria-pressed={isSaved}
        onClick={() => toggleSave(car.id)}
      >
        <HeartIcon size={18} filled={isSaved} />
        {isSaved
          ? "Saved to favourites"
          : "Save vehicle"}
      </button>
    </Panel>
  );
}

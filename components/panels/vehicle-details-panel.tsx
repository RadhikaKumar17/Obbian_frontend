"use client";

import { useObbian } from "@/components/obbian-provider";
import CarVisual from "@/components/ui/car-visual";
import Panel from "@/components/ui/panel";

export default function VehicleDetailsPanel() {
  const { saved, car, toggleSave } = useObbian();
  if (!car) return null;
  return (
    <Panel>
      <CarVisual large />
      <p className="mt-7 text-[15px]">
        {car.transmission} · {car.category} · {car.seats} seats · {car.fuel}
      </p>
      <p className="mt-5">
        ★ {car.rating} · {car.trips}+ trips · {car.distance} km away ·{" "}
        {car.available ? "Available" : "Currently unavailable"}
      </p>
      <p className="mt-5">Pickup: {car.pickup}</p>
      <button
        className="mt-5 text-brand"
        onClick={() => toggleSave(car.id)}
      >
        {saved.includes(car.id)
          ? "♥ Saved to favourites"
          : "♡ Save vehicle"}
      </button>
    </Panel>
  );
}

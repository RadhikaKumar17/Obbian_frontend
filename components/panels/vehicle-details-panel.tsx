"use client";

import { useObbian } from "@/components/obbian-provider";
import CarVisual from "@/components/ui/car-visual";
import Panel from "@/components/ui/panel";

export default function VehicleDetailsPanel() {
  const { saved, car, toggleSave } = useObbian();
  return (
    <Panel>
      <CarVisual large />
      <p className="mt-7 text-[15px]">
        Automatic · SUV · 5 seats · Petrol
      </p>
      <p className="mt-5">
        ★ {car.rating} · 320+ trips · {car.distance} km away ·{" "}
        {car.available ? "Available" : "Currently unavailable"}
      </p>
      <p className="mt-5">Pickup: Connaught Place, New Delhi</p>
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

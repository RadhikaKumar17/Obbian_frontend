"use client";

import { useObbian } from "@/components/obbian-provider";
import RentalSummaryPanel from "@/components/panels/rental-summary-panel";
import VehicleDetailsPanel from "@/components/panels/vehicle-details-panel";
import CarVisual from "@/components/ui/car-visual";
import { ArrowLeftIcon, StarIcon } from "@/components/ui/icons";
import { vehiclePaint, vehiclePhotos } from "@/lib/vehicle-images";
import Link from "next/link";

export default function VehicleScreen() {
  const { car } = useObbian();
  return (
    <>
      <Link href="/search" className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink">
        <ArrowLeftIcon size={15} /> Back to results
      </Link>
      <div className="relative mt-4 overflow-hidden rounded-3xl border border-line bg-white">
        {car && <CarVisual eager photos={vehiclePhotos(car)} name={car.name} paint={vehiclePaint(car.id)} category={car.category} className="aspect-[16/9] w-full md:aspect-[21/9]" />}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-page via-page/80 to-transparent p-5 pt-16 md:p-8 md:pt-24">
          {car && (
            <span className="pill !bg-white/70 backdrop-blur">
              {car.category} · <StarIcon size={12} className="text-amber-500" /> {car.rating} · {car.trips} trips
            </span>
          )}
          <h1 className="mt-3 text-3xl font-bold md:text-6xl">{car?.name ?? "Vehicle"}</h1>
        </div>
      </div>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <VehicleDetailsPanel />
        <RentalSummaryPanel />
      </div>
    </>
  );
}

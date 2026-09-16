"use client";

import { useObbian } from "@/components/obbian-provider";
import ActiveTripPanel from "@/components/panels/active-trip-panel";
import Header from "@/components/ui/header";
import MapPanel from "@/components/ui/map-panel";

export default function TrackingScreen() {
  const { tracking, bookedCar } = useObbian();
  return (
    <>
      <Header
        title="Track your vehicle"
        subtitle="Follow your vehicle’s journey to the pickup location"
      />
      <div className="grid gap-6 lg:grid-cols-[2.76fr_1fr]">
        <MapPanel tracking info={tracking} pickup={bookedCar ? { lat: bookedCar.lat, lng: bookedCar.lng } : null} />
        <ActiveTripPanel />
      </div>
    </>
  );
}

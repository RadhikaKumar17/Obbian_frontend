"use client";

import { useObbian } from "@/components/obbian-provider";
import ActiveTripPanel from "@/components/panels/active-trip-panel";
import Header from "@/components/ui/header";
import MapPanel from "@/components/ui/map-panel";

export default function TrackingScreen() {
  const { tracking, bookedCar, booking } = useObbian();
  return (
    <>
      <Header
        eyebrow={booking?.status === "Active" ? "Live trip" : "Track your vehicle"}
        title={bookedCar?.name ?? "Your vehicle"}
        subtitle={tracking?.location ? `Now near ${tracking.location}` : "Follow your vehicle’s journey to the pickup location"}
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <MapPanel tracking info={tracking} pickup={bookedCar ? { lat: bookedCar.lat, lng: bookedCar.lng } : null} />
        <ActiveTripPanel />
      </div>
    </>
  );
}

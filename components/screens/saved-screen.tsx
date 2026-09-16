"use client";

import { useObbian } from "@/components/obbian-provider";
import EmptySavedPanel from "@/components/panels/empty-saved-panel";
import VehicleCard from "@/components/panels/vehicle-card";
import Header from "@/components/ui/header";

export default function SavedScreen() {
  const { saved, vehicles } = useObbian();
  return (
    <>
      <Header
        title="Saved vehicles"
        subtitle="Compare favourites and continue booking"
      />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {vehicles
          .filter((v) => saved.includes(v.id))
          .map((v) => (
            <VehicleCard key={v.id} v={v} savedView />
          ))}
      </div>
      {!saved.length && (
        <EmptySavedPanel />
      )}
    </>
  );
}

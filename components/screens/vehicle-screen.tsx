"use client";

import { useObbian } from "@/components/obbian-provider";
import RentalSummaryPanel from "@/components/panels/rental-summary-panel";
import VehicleDetailsPanel from "@/components/panels/vehicle-details-panel";
import Go from "@/components/ui/go";
import Header from "@/components/ui/header";

export default function VehicleScreen() {
  const { car } = useObbian();
  return (
    <>
      <Header
        title={car?.name ?? "Vehicle"}
        subtitle="Review availability, pickup and pricing"
      />
      <div className="grid gap-6 lg:grid-cols-[1.57fr_1fr]">
        <VehicleDetailsPanel />
        <RentalSummaryPanel />
      </div>
      <div className="mt-8">
        <Go href="/search" secondary>
          ← Back to results
        </Go>
      </div>
    </>
  );
}

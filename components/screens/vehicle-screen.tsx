"use client";

import { useObbian } from "@/components/obbian-provider";
import RentalSummaryPanel from "@/components/panels/rental-summary-panel";
import VehicleDetailsPanel from "@/components/panels/vehicle-details-panel";
import Go from "@/components/ui/go";
import Header from "@/components/ui/header";
import { ArrowLeftIcon } from "@/components/ui/icons";

export default function VehicleScreen() {
  const { car } = useObbian();
  return (
    <>
      <Header
        title={car?.name ?? "Vehicle"}
        subtitle="Review availability, pickup and pricing"
      />
      <div className="grid items-start gap-6 lg:grid-cols-[1.57fr_1fr]">
        <VehicleDetailsPanel />
        <RentalSummaryPanel />
      </div>
      <div className="mt-8">
        <Go href="/search" secondary>
          <ArrowLeftIcon size={16} /> Back to results
        </Go>
      </div>
    </>
  );
}

"use client";

import EmptyState from "@/components/ui/empty-state";
import Go from "@/components/ui/go";
import { CarIcon } from "@/components/ui/icons";

export default function EmptySearchPanel() {
  return (
    <EmptyState icon={<CarIcon size={22} />} title="No rides found" action={<Go href="/">Adjust filters</Go>}>
      Increase your daily budget or search radius to see more vehicles.
    </EmptyState>
  );
}

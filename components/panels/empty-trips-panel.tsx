"use client";

import { useObbian } from "@/components/obbian-provider";
import EmptyState from "@/components/ui/empty-state";
import Go from "@/components/ui/go";
import { CalendarIcon } from "@/components/ui/icons";

export default function EmptyTripsPanel() {
  const { tab } = useObbian();
  return (
    <EmptyState icon={<CalendarIcon size={22} />} title={`No ${tab.toLowerCase()} trips`} action={<Go href="/">Discover vehicles</Go>}>
      {tab === "Upcoming"
        ? "Your next adventure starts with the right ride."
        : "Trips with this status will appear here."}
    </EmptyState>
  );
}

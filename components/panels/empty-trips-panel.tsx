"use client";

import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";

export default function EmptyTripsPanel() {
  const { tab } = useObbian();
  return (
    <Panel>
      <h2 className="text-lg font-semibold">
        No {tab.toLowerCase()} trips
      </h2>
      <p className="muted my-4">
        {tab === "Upcoming"
          ? "Your next adventure starts with the right ride."
          : "Trips with this status will appear here."}
      </p>
      <Go href="/">Discover vehicles</Go>
    </Panel>
  );
}

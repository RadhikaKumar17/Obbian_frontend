"use client";

import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";

export default function EmptySearchPanel() {
  return (
    <Panel>
      <h2 className="text-lg font-semibold">No rides found</h2>
      <p className="muted mb-5 mt-2">
        Increase your daily budget or search radius to see more
        vehicles.
      </p>
      <Go href="/">Adjust filters</Go>
    </Panel>
  );
}

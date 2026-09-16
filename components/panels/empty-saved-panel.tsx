"use client";

import Go from "@/components/ui/go";
import Panel from "@/components/ui/panel";

export default function EmptySavedPanel() {
  return (
    <Panel>
      <h2 className="text-lg font-semibold">
        Your favourites are waiting
      </h2>
      <p className="muted my-4">
        Save a vehicle from search results to compare it here.
      </p>
      <Go href="/search">Browse vehicles</Go>
    </Panel>
  );
}

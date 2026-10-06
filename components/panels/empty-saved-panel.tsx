"use client";

import EmptyState from "@/components/ui/empty-state";
import Go from "@/components/ui/go";
import { HeartIcon } from "@/components/ui/icons";

export default function EmptySavedPanel() {
  return (
    <EmptyState icon={<HeartIcon size={22} />} title="Your favourites are waiting" action={<Go href="/search">Browse vehicles</Go>}>
      Save a vehicle from search results to compare it here.
    </EmptyState>
  );
}

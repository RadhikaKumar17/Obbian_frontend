"use client";

import EmptyState from "@/components/ui/empty-state";
import { CalendarIcon } from "@/components/ui/icons";
import Link from "next/link";

export default function EmptyBookingPanel() {
  return (
    <EmptyState
      icon={<CalendarIcon size={22} />}
      title="No reservation yet."
      action={
        <Link className="btn" href="/">
          Find a ride →
        </Link>
      }
    />
  );
}

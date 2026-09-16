"use client";

import Panel from "@/components/ui/panel";
import Link from "next/link";

export default function EmptyBookingPanel() {
  return (
    <Panel>
      No reservation yet.{" "}
      <Link className="text-brand" href="/">
        Find a ride →
      </Link>
    </Panel>
  );
}

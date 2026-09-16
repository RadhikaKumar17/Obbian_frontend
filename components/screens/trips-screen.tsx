"use client";

import { useObbian } from "@/components/obbian-provider";
import EmptyTripsPanel from "@/components/panels/empty-trips-panel";
import PastTripsPanel from "@/components/panels/past-trips-panel";
import TripPanel from "@/components/panels/trip-panel";
import Header from "@/components/ui/header";

export default function TripsScreen() {
  const { bookings, tab, setTab } = useObbian();
  return (
    <>
      <Header
        title="My Trips"
        subtitle="Manage upcoming, active and completed rentals"
      />
      <div
        className="mb-6 flex flex-wrap gap-3"
        role="tablist"
        aria-label="Trip status"
      >
        {["Upcoming", "Active", "Completed", "Cancelled"].map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`chip ${tab === t ? "ring-1 ring-brand" : "!bg-white !text-muted"}`}
          >
            {t}{" "}
            {
              bookings.filter(
                (b) => b.status === (t === "Upcoming" ? "Confirmed" : t),
              ).length
            }
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[2.05fr_1fr]">
        <div className="space-y-5">
          {bookings
            .filter(
              (b) =>
                b.status === (tab === "Upcoming" ? "Confirmed" : tab),
            )
            .map((b) => (
              <TripPanel key={b.id} b={b} />
            ))}
          {!bookings.some(
            (b) => b.status === (tab === "Upcoming" ? "Confirmed" : tab),
          ) && (
              <EmptyTripsPanel />
            )}
        </div>
        <PastTripsPanel />
      </div>
    </>
  );
}

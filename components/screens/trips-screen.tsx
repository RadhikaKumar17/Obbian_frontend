"use client";

import { useObbian } from "@/components/obbian-provider";
import EmptyTripsPanel from "@/components/panels/empty-trips-panel";
import TripPanel from "@/components/panels/trip-panel";
import Header from "@/components/ui/header";

export default function TripsScreen() {
  const { bookings, tab, setTab } = useObbian();
  const shown = bookings.filter((b) => b.status === (tab === "Upcoming" ? "Confirmed" : tab));
  return (
    <>
      <Header
        eyebrow="My Trips"
        title="Your journeys"
        subtitle="Manage upcoming, active and completed rentals"
        actions={
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Trip status">
            {["Upcoming", "Active", "Completed", "Cancelled"].map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`pill ${tab === t ? "pill-active" : ""}`}
              >
                {t}{" "}
                <span className="opacity-70">
                  {
                    bookings.filter(
                      (b) => b.status === (t === "Upcoming" ? "Confirmed" : t),
                    ).length
                  }
                </span>
              </button>
            ))}
          </div>
        }
      />
      <div className="space-y-3">
        {shown.map((b, index) => (
          <TripPanel key={b.id} b={b} featured={index === 0 && ["Confirmed", "Active"].includes(b.status)} />
        ))}
        {!shown.length && <EmptyTripsPanel />}
      </div>
    </>
  );
}

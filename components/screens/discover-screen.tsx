"use client";

import AiAssistantPanel from "@/components/panels/ai-assistant-panel";
import SearchFiltersPanel from "@/components/panels/search-filters-panel";
import VehicleCard from "@/components/panels/vehicle-card";
import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import Header from "@/components/ui/header";
import { ArrowRightIcon, CarIcon, ShieldIcon } from "@/components/ui/icons";
import MapPanel from "@/components/ui/map-panel";
import Link from "next/link";

export default function DiscoverScreen() {
  const { results, origin, radius, setUserLocation, select, config } = useObbian();
  return (
    <>
      <Header
        title="Find your perfect ride"
        accent="perfect"
        subtitle={`AI-powered vehicle rentals across ${config?.city ?? "New Delhi"}`}
      />
      <SearchFiltersPanel />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <aside className="min-w-0 space-y-5 xl:order-last">
          <AiAssistantPanel />
          <MapPanel vehicles={results} origin={origin} radiusKm={Number(radius)} onOriginChange={setUserLocation} onVehicleSelect={select} />
        </aside>
        <section aria-label="Available vehicles" className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted" aria-live="polite">
              <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "vehicle matches" : "vehicles match"} your filters
            </p>
            <Link href="/search" className="link inline-flex items-center gap-1 text-[13px]">
              View all results <ArrowRightIcon size={15} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
            {results.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
          {!results.length && (
            <div className="panel flex flex-col items-center px-6 py-12 text-center">
              <span className="icon-tile"><CarIcon size={22} /></span>
              <h2 className="mt-4 text-lg font-semibold">No rides found</h2>
              <p className="muted mt-2 max-w-sm">Increase your daily budget or search radius above to see more vehicles.</p>
            </div>
          )}
          <div className="mt-6">
            <Go href="/policy" secondary>
              <ShieldIcon size={17} />
              Ask cancellation policy
            </Go>
          </div>
        </section>
      </div>
    </>
  );
}

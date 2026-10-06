"use client";

import AiAssistantPanel from "@/components/panels/ai-assistant-panel";
import SearchFiltersPanel from "@/components/panels/search-filters-panel";
import VehicleCard from "@/components/panels/vehicle-card";
import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import { CarIcon, ShieldIcon } from "@/components/ui/icons";

export default function DiscoverScreen() {
  const { results, config } = useObbian();
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <SearchFiltersPanel />
        <h1 className="mt-6 text-4xl font-bold md:text-5xl">
          Find your <span className="text-accent">next</span> ride
        </h1>
        <p className="mt-2 text-base text-muted">Flexible rentals. Real freedom. AI-powered across {config?.city ?? "New Delhi"}.</p>
        <section aria-label="Available vehicles" className="mt-6">
          <p className="sr-only" aria-live="polite">{results.length} vehicles match your filters</p>
          <div className="grid gap-5 md:grid-cols-2">
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
        </section>
        <div className="mt-6">
          <Go href="/policy" secondary>
            <ShieldIcon size={17} />
            Ask cancellation policy
          </Go>
        </div>
      </div>
      <AiAssistantPanel />
    </div>
  );
}

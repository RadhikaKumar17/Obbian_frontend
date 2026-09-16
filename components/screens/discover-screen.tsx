"use client";

import AiAssistantPanel from "@/components/panels/ai-assistant-panel";
import SearchFiltersPanel from "@/components/panels/search-filters-panel";
import { useObbian } from "@/components/obbian-provider";
import Go from "@/components/ui/go";
import Header from "@/components/ui/header";
import MapPanel from "@/components/ui/map-panel";

export default function DiscoverScreen() {
  const { results, origin, radius, setUserLocation } = useObbian();
  return (
    <>
      <Header
        title="Find your perfect ride"
        subtitle="AI-powered vehicle rentals across New Delhi"
      />
      <SearchFiltersPanel />
      <div className="grid gap-5 lg:grid-cols-[1.74fr_1fr]">
        <AiAssistantPanel />
        <MapPanel vehicles={results} origin={origin} radiusKm={Number(radius)} onOriginChange={setUserLocation} />
      </div>
      <div className="mt-8">
        <Go href="/policy" secondary>
          Ask cancellation policy
        </Go>
      </div>
    </>
  );
}

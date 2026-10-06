"use client";

import { useObbian } from "@/components/obbian-provider";
import EmptySearchPanel from "@/components/panels/empty-search-panel";
import VehicleCard from "@/components/panels/vehicle-card";
import Dropdown from "@/components/ui/dropdown";
import Header from "@/components/ui/header";
import { ArrowLeftIcon } from "@/components/ui/icons";
import MapPanel from "@/components/ui/map-panel";
import Link from "next/link";

export default function SearchScreen() {
  const { sort, setSort, results, config, origin, radius, setUserLocation, select } = useObbian();
  return (
    <>
      <Header
        title={`${results.length} vehicles match your search`}
        subtitle="AI-ranked using availability, distance and price"
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link className="link inline-flex items-center gap-1.5" href="/">
          <ArrowLeftIcon size={16} /> Edit search
        </Link>
        <div className="flex items-center gap-2 text-[13px] text-muted">
          <span aria-hidden="true">Sort by</span>
          <Dropdown
            aria-label="Sort vehicles"
            align="end"
            value={sort}
            onChange={setSort}
            className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink transition hover:border-tint-strong hover:bg-wash"
            options={config?.sortOptions ?? []}
          />
        </div>
      </div>
      <div className="mb-6"><MapPanel vehicles={results} origin={origin} radiusKm={Number(radius)} onOriginChange={setUserLocation} onVehicleSelect={select} /></div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {results.map((v) => (
          <VehicleCard key={v.id} v={v} />
        ))}
      </div>
      {!results.length && (
        <EmptySearchPanel />
      )}
    </>
  );
}

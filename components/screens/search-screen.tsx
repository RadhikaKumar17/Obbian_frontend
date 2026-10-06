"use client";

import { useObbian } from "@/components/obbian-provider";
import EmptySearchPanel from "@/components/panels/empty-search-panel";
import VehicleCard from "@/components/panels/vehicle-card";
import Header from "@/components/ui/header";
import { ArrowLeftIcon } from "@/components/ui/icons";
import MapPanel from "@/components/ui/map-panel";
import { dateLabel } from "@/lib/data";
import Link from "next/link";

export default function SearchScreen() {
  const { sort, setSort, results, config, date, origin, radius, setUserLocation, select } = useObbian();
  return (
    <>
      <Link className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink" href="/">
        <ArrowLeftIcon size={15} /> Edit search
      </Link>
      <Header
        eyebrow="Search results"
        title={`${results.length} ${results.length === 1 ? "ride" : "rides"} near you`}
        subtitle={`${config?.city ?? ""} · ${dateLabel(date)} · AI-ranked using availability, distance and price`}
        actions={
          <div role="group" aria-label="Sort vehicles" className="flex flex-wrap gap-2">
            {(config?.sortOptions ?? []).map((option) => (
              <button key={option.value} type="button" aria-pressed={sort === option.value} onClick={() => setSort(option.value)} className={`pill ${sort === option.value ? "pill-active" : ""}`}>
                {option.label}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="lg:order-last lg:sticky lg:top-8 lg:h-fit">
          <MapPanel tall vehicles={results} origin={origin} radiusKm={Number(radius)} onOriginChange={setUserLocation} onVehicleSelect={select} />
        </div>
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            {results.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
          {!results.length && <EmptySearchPanel />}
        </div>
      </div>
    </>
  );
}

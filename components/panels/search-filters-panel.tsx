"use client";

import { useObbian } from "@/components/obbian-provider";
import Dropdown from "@/components/ui/dropdown";
import { CalendarIcon, LocateIcon, PinIcon, SearchIcon, Spinner } from "@/components/ui/icons";
import Input from "@/components/ui/input";
import { localDate, tomorrow } from "@/lib/data";
import Link from "next/link";

const bar = "panel flex min-h-12 flex-1 items-center gap-2 !rounded-2xl !px-4 !py-2 text-sm";
const menu = "pill !min-h-8 gap-2";

export default function SearchFiltersPanel() {
  const { vehicles, category, setCategory, transmission, setTransmission, date, setDate, radius, setRadius, budget, setBudget, sort, setSort, config, userLocation, locateMe, locating } = useObbian();
  const categories = Array.from(new Set(["SUV", ...vehicles.map(v => v.category)]));
  return (
    <section aria-label="Search filters">
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className={bar}>
          <PinIcon size={17} className="shrink-0 text-muted" />
          <span className="min-w-0 flex-1 truncate">{config?.city}</span>
          <button type="button" onClick={locateMe} disabled={locating} className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition disabled:opacity-50 ${userLocation ? "bg-tint text-brand-strong" : "text-brand hover:bg-wash"}`}>
            {locating ? <Spinner size={14} /> : <LocateIcon size={15} />}
            {locating ? "Locating…" : userLocation ? "Using your location" : "Use my location"}
          </button>
        </div>
        <label className={bar}>
          <CalendarIcon size={17} className="shrink-0 text-muted" />
          <span className="sr-only">Pickup date</span>
          <Input
            aria-label="Pickup date"
            type="date"
            min={localDate()}
            value={date}
            onChange={(e) => setDate(e.target.value || tomorrow())}
            className="!rounded-md !border-0 !bg-transparent !p-0"
          />
        </label>
        <Link href="/search" aria-label="Search vehicles" className="btn-icon">
          <SearchIcon size={18} />
        </Link>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Vehicle type" className="flex flex-wrap gap-2">
          {[{ value: "", label: "All Vehicles" }, ...categories.map(value => ({ value, label: value }))].map(option => (
            <button
              key={option.value || "all"}
              type="button"
              aria-pressed={category === option.value}
              onClick={() => setCategory(option.value)}
              className={`pill ${category === option.value ? "pill-active" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <Dropdown aria-label="Transmission" value={transmission} onChange={setTransmission} className={menu} options={[{value: "", label: "All transmissions"}, ...Array.from(new Set(["Automatic", ...vehicles.map(v => v.transmission)])).map(value => ({value, label: value}))]} />
        <Dropdown aria-label="Search radius" value={radius} onChange={setRadius} className={menu} options={config?.radiusOptions ?? []} />
        <Dropdown aria-label="Daily budget" value={budget} onChange={setBudget} className={menu} options={config?.budgetOptions ?? []} />
        <div className="ml-auto flex items-center gap-2 text-sm text-muted">
          <span aria-hidden="true">Sort by</span>
          <Dropdown aria-label="Sort vehicles" align="end" value={sort} onChange={setSort} className={menu} options={config?.sortOptions ?? []} />
        </div>
      </div>
    </section>
  );
}

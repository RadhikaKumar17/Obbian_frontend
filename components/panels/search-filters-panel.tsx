"use client";

import { useObbian } from "@/components/obbian-provider";
import Dropdown from "@/components/ui/dropdown";
import { CalendarIcon, LocateIcon, PinIcon, SearchIcon, Spinner } from "@/components/ui/icons";
import Input from "@/components/ui/input";
import { localDate, tomorrow } from "@/lib/data";
import Link from "next/link";

const control = "rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium transition hover:border-tint-strong hover:bg-wash";

export default function SearchFiltersPanel() {
  const { vehicles, category, setCategory, transmission, setTransmission, date, setDate, radius, setRadius, budget, setBudget, sort, setSort, config, userLocation, locateMe, locating } = useObbian();
  const categories = Array.from(new Set(["SUV", ...vehicles.map(v => v.category)]));
  return (
    <div className="mb-6">
      <section aria-label="Search filters" className="panel !p-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`flex min-h-11 items-center gap-2 ${control} hover:!bg-white`}>
            <PinIcon size={18} className="text-brand" />
            {config?.city}
          </span>
          <label className={`flex min-h-11 items-center gap-2 ${control}`}>
            <CalendarIcon size={18} className="text-brand" />
            <span className="sr-only">Pickup date</span>
            <Input
              aria-label="Pickup date"
              type="date"
              min={localDate()}
              value={date}
              onChange={(e) => setDate(e.target.value || tomorrow())}
              className="!w-auto !rounded-md !border-0 !bg-transparent !p-0 font-medium"
            />
          </label>
          <Dropdown
            aria-label="Search radius"
            value={radius}
            onChange={setRadius}
            className={control}
            options={config?.radiusOptions ?? []}
          />
          <Dropdown aria-label="Transmission" value={transmission} onChange={setTransmission} className={control} options={[{value: "", label: "All transmissions"}, ...Array.from(new Set(["Automatic", ...vehicles.map(v => v.transmission)])).map(value => ({value, label: value}))]} />
          <Dropdown
            aria-label="Daily budget"
            value={budget}
            onChange={setBudget}
            className={control}
            options={config?.budgetOptions ?? []}
          />
          <button type="button" onClick={locateMe} disabled={locating} className={`flex min-h-11 items-center gap-2 text-brand disabled:opacity-50 ${control} ${userLocation ? "!border-tint-strong !bg-tint" : ""}`}>
            {locating ? <Spinner size={16} /> : <LocateIcon size={18} />}
            {locating ? "Locating…" : userLocation ? "Using your location" : "Use my location"}
          </button>
          <Link href="/search" aria-label="Search vehicles" className="btn-icon ml-auto">
            <SearchIcon size={19} />
          </Link>
        </div>
      </section>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Vehicle type" className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1">
          {[{ value: "", label: "All vehicles" }, ...categories.map(value => ({ value, label: value }))].map(option => (
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
        <div className="flex items-center gap-2 text-[13px] text-muted">
          <span aria-hidden="true">Sort by</span>
          <Dropdown
            aria-label="Sort vehicles"
            align="end"
            value={sort}
            onChange={setSort}
            className={`${control} !py-2 text-ink`}
            options={config?.sortOptions ?? []}
          />
        </div>
      </div>
    </div>
  );
}

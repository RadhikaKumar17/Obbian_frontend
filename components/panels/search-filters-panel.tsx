"use client";

import { useObbian } from "@/components/obbian-provider";
import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { localDate, tomorrow } from "@/lib/data";

export default function SearchFiltersPanel() {
  const { vehicles, category, setCategory, transmission, setTransmission, date, setDate, radius, setRadius, budget, setBudget, config, userLocation, locateMe, locating } = useObbian();
  return (
    <Panel className="mb-[22px] !py-3">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        <span className="font-medium">{config?.city}</span>
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Pickup date</span>
          <Input
            aria-label="Pickup date"
            type="date"
            min={localDate()}
            value={date}
            onChange={(e) => setDate(e.target.value || tomorrow())}
            className="rounded-lg bg-transparent p-1"
          />
        </label>
        <Dropdown
          aria-label="Search radius"
          value={radius}
          onChange={setRadius}
          className="rounded-lg p-1"
          options={config?.radiusOptions ?? []}
        />
        <button type="button" onClick={locateMe} disabled={locating} className="chip text-brand disabled:opacity-50">
          {locating ? "Locating…" : userLocation ? "📍 Using your location" : "📍 Use my location"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-5 sm:gap-20">
        <Dropdown aria-label="Vehicle type" value={category} onChange={setCategory} className="chip" options={[{value: "", label: "All vehicle types"}, ...Array.from(new Set(["SUV", ...vehicles.map(v => v.category)])).map(value => ({value, label: value}))]} />
        <Dropdown aria-label="Transmission" value={transmission} onChange={setTransmission} className="chip" options={[{value: "", label: "All transmissions"}, ...Array.from(new Set(["Automatic", ...vehicles.map(v => v.transmission)])).map(value => ({value, label: value}))]} />
        <Dropdown
          aria-label="Daily budget"
          value={budget}
          onChange={setBudget}
          className="chip"
          options={config?.budgetOptions ?? []}
        />
      </div>
    </Panel>
  );
}

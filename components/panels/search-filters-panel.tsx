"use client";

import { useObbian } from "@/components/obbian-provider";
import Chip from "@/components/ui/chip";
import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import { localDate, tomorrow } from "@/lib/data";

export default function SearchFiltersPanel() {
  const { date, setDate, radius, setRadius, budget, setBudget } = useObbian();
  return (
    <Panel className="mb-[22px] !py-3">
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
        <span className="font-medium">New Delhi</span>
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
          options={[
            { value: "10", label: "10 km radius" },
            { value: "3", label: "3 km radius" },
            { value: "5", label: "5 km radius" },
          ]}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-5 sm:gap-20">
        <Chip>SUV</Chip>
        <Chip>Automatic</Chip>
        <Dropdown
          aria-label="Daily budget"
          value={budget}
          onChange={setBudget}
          className="chip"
          options={[
            { value: "3000", label: "Under ₹3,000/day" },
            { value: "2700", label: "Under ₹2,700/day" },
            { value: "2500", label: "Under ₹2,500/day" },
            { value: "2000", label: "Under ₹2,000/day" },
          ]}
        />
      </div>
    </Panel>
  );
}

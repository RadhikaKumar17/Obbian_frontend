"use client";

import { useObbian } from "@/components/obbian-provider";
import EmptySearchPanel from "@/components/panels/empty-search-panel";
import VehicleCard from "@/components/panels/vehicle-card";
import Dropdown from "@/components/ui/dropdown";
import Header from "@/components/ui/header";
import Link from "next/link";

export default function SearchScreen() {
  const { sort, setSort, results } = useObbian();
  return (
    <>
      <Header
        title={`${results.length} vehicles match your search`}
        subtitle="AI-ranked using availability, distance and price"
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link className="text-brand" href="/">
          ← Edit search
        </Link>
        <Dropdown
          aria-label="Sort vehicles"
          align="end"
          value={sort}
          onChange={setSort}
          className="rounded-lg border border-line bg-white p-2"
          options={[
            { value: "recommended", label: "Recommended" },
            { value: "price", label: "Price: low to high" },
            { value: "rating", label: "Highest rated" },
          ]}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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

"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import CarVisual from "@/components/ui/car-visual";
import Chip from "@/components/ui/chip";
import Panel from "@/components/ui/panel";
import type { Vehicle } from "@/lib/data";
import { dateLabel, money } from "@/lib/data";

export default function VehicleCard({ v, savedView = false }: { v: Vehicle; savedView?: boolean }) {
  const { saved, date, select, toggleSave } = useObbian();
  return (
    <Panel className="flex flex-col !p-[18px]">
      <CarVisual />
      <div className="mt-4 flex min-h-8 items-center justify-between">
        {!savedView && v.id === "creta" ? (
          <Chip>AI recommended</Chip>
        ) : (
          <span />
        )}
        <button
          onClick={() => toggleSave(v.id)}
          aria-label={`${saved.includes(v.id) ? "Unsave" : "Save"} ${v.name}`}
          aria-pressed={saved.includes(v.id)}
          className="rounded-lg px-2 py-1 text-xl text-brand"
        >
          {saved.includes(v.id) ? "♥" : "♡"}
        </button>
      </div>
      <h2 className="mt-4 text-[21px] font-semibold">{v.name}</h2>
      <p className="muted mt-3">
        {savedView
          ? `★ ${v.rating} · Automatic SUV`
          : `${v.distance} km · ★ ${v.rating}`}
      </p>
      {savedView ? (
        <p className="muted mt-6">
          {v.available
            ? "Available " + dateLabel(date).toLowerCase()
            : "Check future availability"}
        </p>
      ) : (
        <div className="mt-5 flex gap-4">
          <Chip>SUV</Chip>
          <Chip>Automatic</Chip>
        </div>
      )}
      <p className="my-5 text-right text-lg font-semibold">
        {money(v.price)}/day
      </p>
      <div className="mt-auto flex flex-wrap gap-3">
        <button className="btn flex-1" onClick={() => select(v)}>
          {savedView
            ? v.available
              ? "Reserve now"
              : "Check dates"
            : v.id === "creta"
              ? "View details"
              : "Select"}
        </button>
        {savedView && (
          <Button secondary onClick={() => toggleSave(v.id)}>
            Remove
          </Button>
        )}
      </div>
    </Panel>
  );
}

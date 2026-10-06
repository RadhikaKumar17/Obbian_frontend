"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import CarVisual from "@/components/ui/car-visual";
import { FuelIcon, GearboxIcon, HeartIcon, SeatsIcon, SparkleIcon, StarIcon } from "@/components/ui/icons";
import type { Vehicle } from "@/lib/data";
import { dateLabel, money } from "@/lib/data";

export default function VehicleCard({ v, savedView = false }: { v: Vehicle; savedView?: boolean }) {
  const { saved, date, select, toggleSave, recommendedId } = useObbian();
  const isSaved = saved.includes(v.id);
  const recommended = !savedView && v.id === recommendedId;
  return (
    <article className="panel group flex flex-col !p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative">
        <CarVisual src={v.imageUrl} name={v.name} />
        {recommended ? (
          <span className="chip absolute left-3 top-3 bg-white/95 shadow-sm"><SparkleIcon size={13} />AI recommended</span>
        ) : !v.available ? (
          <span className="chip absolute left-3 top-3 !bg-white/95 !text-muted shadow-sm">Unavailable</span>
        ) : null}
        <button
          onClick={() => toggleSave(v.id)}
          aria-label={`${isSaved ? "Unsave" : "Save"} ${v.name}`}
          aria-pressed={isSaved}
          className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 ${isSaved ? "text-brand" : "text-muted hover:text-brand"}`}
        >
          <HeartIcon size={18} filled={isSaved} />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-[17px] font-semibold leading-6">{v.name}</h2>
          <p className="muted mt-0.5 truncate">
            {savedView
              ? v.available
                ? "Available " + dateLabel(date).toLowerCase()
                : "Check future availability"
              : `${v.category} · ${v.distance} km away`}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold leading-6">
            {money(v.price)}
            <span className="text-xs font-normal text-muted">/day</span>
          </p>
          <p className="mt-0.5 flex items-center justify-end gap-1 text-xs text-muted">
            <StarIcon size={13} className="text-amber-500" />
            <span className="font-semibold text-ink">{v.rating}</span>
            {v.trips ? <span>({v.trips})</span> : null}
          </p>
        </div>
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-2 text-xs" aria-label="Vehicle features">
        <li className="flex min-w-0 flex-col items-center gap-1 rounded-xl bg-wash px-1.5 py-2.5 text-center"><SeatsIcon size={16} className="shrink-0 text-brand" /><span className="w-full truncate">{v.seats} seats</span></li>
        <li className="flex min-w-0 flex-col items-center gap-1 rounded-xl bg-wash px-1.5 py-2.5 text-center"><GearboxIcon size={16} className="shrink-0 text-brand" /><span className="w-full truncate">{v.transmission}</span></li>
        <li className="flex min-w-0 flex-col items-center gap-1 rounded-xl bg-wash px-1.5 py-2.5 text-center"><FuelIcon size={16} className="shrink-0 text-brand" /><span className="w-full truncate">{v.fuel}</span></li>
      </ul>
      <div className="mt-auto flex flex-wrap gap-2.5 pt-4">
        <button className="btn flex-1" onClick={() => select(v)}>
          {savedView
            ? v.available
              ? "Reserve now"
              : "Check dates"
            : v.id === recommendedId
              ? "View details"
              : "Select"}
        </button>
        {savedView && (
          <Button secondary onClick={() => toggleSave(v.id)}>
            Remove
          </Button>
        )}
      </div>
    </article>
  );
}

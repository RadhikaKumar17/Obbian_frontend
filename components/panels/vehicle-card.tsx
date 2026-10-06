"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import CarVisual from "@/components/ui/car-visual";
import { HeartIcon, StarIcon } from "@/components/ui/icons";
import type { Vehicle } from "@/lib/data";
import { dateLabel, money } from "@/lib/data";
import { vehiclePaint, vehiclePhotos } from "@/lib/vehicle-images";

export default function VehicleCard({ v, savedView = false }: { v: Vehicle; savedView?: boolean }) {
  const { saved, date, select, toggleSave, recommendedId, results } = useObbian();
  const isSaved = saved.includes(v.id);
  // Tags come from the live result set, never from a fixed list.
  const cheapest = results.length > 1 && v.price === Math.min(...results.map((r) => r.price));
  const topRated = results.length > 1 && v.rating === Math.max(...results.map((r) => r.rating));
  const tag = !v.available
    ? "Unavailable"
    : savedView
      ? ""
      : v.id === recommendedId
        ? "AI recommended"
        : cheapest
          ? "Great value"
          : topRated
            ? "Top rated"
            : "";
  return (
    <article className="panel flex flex-col !p-4 transition duration-200 hover:shadow-lift">
      <div className="flex min-h-7 items-center justify-between">
        {tag ? <span className={`chip ${v.available ? "" : "!bg-wash !text-muted"}`}>{tag}</span> : <span />}
        <button
          onClick={() => toggleSave(v.id)}
          aria-label={`${isSaved ? "Unsave" : "Save"} ${v.name}`}
          aria-pressed={isSaved}
          className={`grid size-8 place-items-center rounded-full transition hover:bg-wash ${isSaved ? "text-brand" : "text-muted hover:text-brand"}`}
        >
          <HeartIcon size={19} filled={isSaved} />
        </button>
      </div>
      <CarVisual photos={vehiclePhotos(v)} name={v.name} paint={vehiclePaint(v.id)} category={v.category} className="my-2 aspect-[16/10] w-full rounded-xl" />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold">{v.name}</h3>
          <p className="truncate text-xs text-muted">
            {savedView
              ? v.available
                ? "Available " + dateLabel(date).toLowerCase()
                : "Check future availability"
              : `${v.category} · ${v.transmission} · ${v.fuel}`}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-xl font-bold">
            {money(v.price)}
            <span className="font-sans text-xs font-normal text-muted"> / day</span>
          </p>
          <p className="flex items-center justify-end gap-1 text-xs text-muted">
            <StarIcon size={12} className="text-amber-500" /> {v.rating} ({v.trips})
          </p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {[
          [`${v.seats}`, "Seats"],
          [`${v.distance} km`, "Away"],
          [v.pickup.split(/[ ,]/)[0], "Pickup"],
        ].map(([value, label]) => (
          <div key={label} className="stat flex min-w-0 flex-col-reverse">
            <dt className="text-muted">{label}</dt>
            <dd className="truncate font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto flex flex-wrap gap-2.5 pt-4">
        <button className="btn flex-1 !py-3" onClick={() => select(v)}>
          {savedView
            ? v.available
              ? "Reserve now"
              : "Check dates"
            : "View Details"}
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

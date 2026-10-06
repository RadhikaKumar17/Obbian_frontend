"use client";

import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import CarVisual from "@/components/ui/car-visual";
import Chip, { type ChipTone } from "@/components/ui/chip";
import type { Booking } from "@/lib/data";
import { dateLabel, money } from "@/lib/data";
import { vehiclePaint, vehiclePhotos } from "@/lib/vehicle-images";

const statusTone: Record<Booking["status"], ChipTone> = {
  Confirmed: "brand",
  Active: "success",
  Completed: "neutral",
  Cancelled: "danger",
};

/** One booking. `featured` renders the large split card used for the next or live trip. */
export default function TripPanel({ b, featured = false }: { b: Booking; featured?: boolean }) {
  const { router, vehicles, setSelectedBooking, setManage, setNewDate, receipt, completeBooking, completing, setToast } = useObbian();
  const vehicle = vehicles.find((v) => v.id === b.vehicleId);
  const photos = vehiclePhotos(vehicle ?? { id: b.vehicleId, category: "SUV" });
  const actions = ["Confirmed", "Active"].includes(b.status) ? (
    <>
      <Button
        onClick={() => {
          setSelectedBooking(b.id);
          router.push("/tracking");
        }}
      >
        Track vehicle
      </Button>
      {b.status === "Confirmed" ? (
        <Button
          secondary
          onClick={() => {
            setManage(b);
            setNewDate(b.date);
          }}
        >
          Manage booking
        </Button>
      ) : (
        <Button
          secondary
          disabled={completing}
          onClick={() => {
            completeBooking(b.id)
              .then(() => setToast("Trip completed"))
              .catch((error) => setToast(error instanceof Error ? error.message : "Something went wrong."));
          }}
        >
          {completing ? "Completing…" : "Complete trip"}
        </Button>
      )}
    </>
  ) : (
    <Button secondary onClick={() => receipt(b)}>
      Download receipt
    </Button>
  );

  if (featured)
    return (
      <article className="panel grid overflow-hidden !p-0 md:grid-cols-2">
        <CarVisual photos={photos} name={b.vehicleName} paint={vehiclePaint(b.vehicleId)} category={vehicle?.category} className="aspect-[16/10] h-full w-full border-b border-line md:border-b-0 md:border-r" />
        <div className="p-6 md:p-8">
          <Chip tone={statusTone[b.status]}>
            {b.status === "Active" && <span className="size-1.5 animate-pulse rounded-full bg-current" aria-hidden="true" />}
            {b.status}
          </Chip>
          <h2 className="mt-4 text-3xl font-bold">{b.vehicleName}</h2>
          <p className="mt-1 text-base text-muted">
            {dateLabel(b.date)} · {b.timeLabel}
          </p>
          <p className="mt-4 text-sm text-muted">
            {b.pickup} · Booking {b.id}
          </p>
          <p className="mt-1 text-sm text-muted">
            {money(b.total)} · {b.paymentStatus}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 [&>*]:!py-3">{actions}</div>
        </div>
      </article>
    );

  return (
    <article className="panel flex flex-wrap items-center gap-4 !p-3">
      <CarVisual photos={photos} name="" paint={vehiclePaint(b.vehicleId)} category={vehicle?.category} className="h-16 w-24 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <h2 className="truncate font-sans text-sm font-semibold tracking-normal">{b.vehicleName}</h2>
        <p className="truncate text-sm text-muted">
          {dateLabel(b.date)} · {b.timeLabel} · {b.pickup} · Booking {b.id}
        </p>
      </div>
      <Chip tone={statusTone[b.status]}>{b.status}</Chip>
      <div className="flex flex-wrap gap-2 [&>*]:!min-h-9 [&>*]:!px-4 [&>*]:!py-1.5 [&>*]:!text-[13px]">{actions}</div>
    </article>
  );
}

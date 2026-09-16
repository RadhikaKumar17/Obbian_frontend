export default function MapPanel({
  tracking = false,
  distance = 2.1,
  paused = false,
}: {
  tracking?: boolean;
  distance?: number;
  paused?: boolean;
}) {
  return (
    <section
      aria-label="Simulated vehicle map"
      className={`relative overflow-hidden rounded-2xl border border-line bg-[#e5f5ed] p-5 ${tracking ? "min-h-[450px] lg:min-h-[650px]" : "min-h-[330px]"}`}
    >
      <p className="text-[13px] font-semibold text-success">
        ●{" "}
        {paused
          ? "PAUSED"
          : tracking
            ? "LIVE · Updating now"
            : "LIVE MAP · New Delhi"}
      </p>
      <div className="absolute inset-x-6 top-[44%] flex items-center justify-center gap-3 text-brand">
        <span className="font-semibold">
          ● {tracking ? "Your location" : "You"}
        </span>
        <span className="w-24 border-t-2 border-dashed border-brand sm:w-36" />
        <span
          className="text-2xl transition-transform duration-1000"
          style={{ transform: `translateX(${(2.1 - distance) * -18}px)` }}
        >
          🚙
        </span>
      </div>
      <p className="absolute inset-x-5 top-[59%] text-center text-[13px]">
        {distance === 0
          ? "Your vehicle has arrived"
          : tracking
            ? `Vehicle is ${distance.toFixed(1)} km away · ETA ${Math.ceil(distance / 0.35)} minutes`
            : `${distance.toFixed(1)} km · updating now`}
      </p>
      {tracking && (
        <p className="absolute bottom-5 left-5 text-xs text-muted">
          Demo tracking · simulated location
        </p>
      )}
    </section>
  );
}

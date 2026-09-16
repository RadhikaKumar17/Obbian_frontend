export default function CarVisual({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-tint ${large ? "h-60" : "h-[190px]"}`}
    >
      <span
        role="img"
        aria-label="Blue rental SUV"
        className={large ? "text-8xl" : "text-7xl"}
      >
        🚙
      </span>
    </div>
  );
}

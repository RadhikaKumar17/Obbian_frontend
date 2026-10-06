/**
 * Vehicle artwork. Uses the vehicle photo when the API provides one and falls
 * back to a neutral illustration, so cards never render an empty frame.
 */
export default function CarVisual({ large = false, src, name = "Rental vehicle" }: { large?: boolean; src?: string; name?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-wash to-tint ${large ? "h-64" : "h-[170px]"}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} loading="lazy" className="h-full w-full object-contain p-3" />
      ) : (
        <svg
          role="img"
          aria-label={name}
          viewBox="0 0 320 140"
          className={large ? "w-[78%] max-w-[420px]" : "w-[82%] max-w-[280px]"}
        >
          <ellipse cx="160" cy="122" rx="128" ry="8" fill="var(--color-brand)" opacity="0.10" />
          <path
            d="M34 96c-6 0-10-4-10-10V78c0-7 4-12 11-14l38-9 24-24c5-5 11-7 18-7h74c8 0 15 3 20 9l22 26 52 9c8 2 13 8 13 16v12c0 6-4 10-10 10H34z"
            fill="#fff"
            stroke="var(--color-brand)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M92 56l17-18c3-3 6-4 10-4h36v22H92zM165 34h23c5 0 9 2 12 6l13 16h-48V34z" fill="var(--color-tint-strong)" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M26 82h14M280 80h16M150 70h14" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
          <g fill="var(--color-ink)">
            <circle cx="88" cy="98" r="21" />
            <circle cx="236" cy="98" r="21" />
          </g>
          <g fill="#fff">
            <circle cx="88" cy="98" r="9" />
            <circle cx="236" cy="98" r="9" />
          </g>
        </svg>
      )}
    </div>
  );
}

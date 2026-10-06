"use client";

import type { VehiclePhoto } from "@/lib/vehicle-images";
import { useId, useState } from "react";

/**
 * Vehicle artwork. Tries each photo in order and falls back to an illustration
 * when none loads, so a card never renders an empty frame. The caller sets the
 * frame size through `className`.
 */
export default function CarVisual({ photos = [], name = "Rental vehicle", paint = "#eef0ee", category = "SUV", className = "aspect-[16/10]", eager = false }: { photos?: VehiclePhoto[]; name?: string; paint?: string; category?: string; className?: string; eager?: boolean }) {
  const [state, setState] = useState({ key: "", index: 0 });
  const key = photos.map((photo) => photo.src).join("|");
  // Start again from the first photo whenever the vehicle changes.
  const index = state.key === key ? state.index : 0;
  const photo = photos[index];
  const clip = useId();
  const suv = !/sedan|hatch/i.test(category);
  // Roof height differs by body style; everything else is shared.
  const top = suv ? 30 : 40;
  const body = `M24 112c-5 0-8-3-8-8V78c0-9 5-15 13-17l10-3 ${suv ? 16 : 30}-${58 - top}c3-4 8-6 13-6h${suv ? 112 : 92}c7 0 13 3 18 8l${suv ? 34 : 38} ${58 - top - 2} 62 9c9 2 15 8 15 17v16c0 5-3 8-8 8z`;
  const glass = suv
    ? `M58 58l13-19c2-3 5-4 8-4h105c5 0 9 2 12 5l22 18z`
    : `M70 58l22-11c3-2 6-2 9-2h78c5 0 9 2 12 5l26 8z`;
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${photo?.fit === "contain" ? "bg-white" : "bg-gradient-to-b from-wash to-tint"} ${className}`}>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={photo.src}
          src={photo.src}
          alt={name}
          loading={eager ? "eager" : "lazy"}
          onError={() => setState({ key, index: index + 1 })}
          className={`h-full w-full ${photo.fit === "contain" ? "object-contain" : "object-cover"}`}
          style={{ objectPosition: photo.focus, transform: photo.zoom ? `scale(${photo.zoom})` : undefined, transformOrigin: photo.focus }}
        />
      ) : (
        <svg
          role="img"
          aria-label={name}
          viewBox="0 0 320 150"
          className="h-[78%] max-w-[86%]"
        >
          <defs>
            <clipPath id={clip}><path d={body} /></clipPath>
            <linearGradient id={`${clip}-shade`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="134" rx="138" ry="7" fill="#10231b" opacity="0.13" />
          <path d={body} fill={paint} />
          <g clipPath={`url(#${clip})`}>
            <rect x="0" y="0" width="320" height="150" fill={`url(#${clip}-shade)`} />
            {/* lower cladding and bumpers */}
            <rect x="0" y="100" width="320" height="20" fill="#232b29" />
            {/* lamps */}
            <path d="M296 70h12v9h-18z" fill="#fff7d6" />
            <rect x="12" y="66" width="13" height="12" rx="2" fill="#c8362f" />
          </g>
          <path d={body} fill="none" stroke="#10231b" strokeOpacity="0.28" strokeWidth="1.5" />
          {/* glass with pillars */}
          <path d={glass} fill="#1d2a27" />
          <path d={glass} fill="#fff" opacity="0.10" transform="translate(0 -1)" />
          <g stroke={paint} strokeWidth="5">
            <path d={`M118 ${top + 4}v24M168 ${top + 4}v24`} />
          </g>
          {/* door seams, handles, mirror */}
          <g stroke="#10231b" strokeOpacity="0.22" strokeWidth="1.2" fill="none">
            <path d="M118 60v40M168 60v40M214 60c4 12 5 26 4 40" />
          </g>
          <g fill="#10231b" fillOpacity="0.35">
            <rect x="126" y="66" width="12" height="3" rx="1.5" />
            <rect x="176" y="66" width="12" height="3" rx="1.5" />
          </g>
          <path d="M212 50h9c2 0 3 1 3 3v4h-12z" fill={paint} stroke="#10231b" strokeOpacity="0.3" />
          {suv && <path d="M78 29h104" stroke="#232b29" strokeWidth="3" strokeLinecap="round" />}
          {/* wheels */}
          {[80, 244].map((x) => (
            <g key={x}>
              <circle cx={x} cy="112" r="27" fill="#232b29" />
              <circle cx={x} cy="112" r="22" fill="#111715" />
              <circle cx={x} cy="112" r="14" fill="#cfd5d3" />
              <g stroke="#7d8684" strokeWidth="2.5" strokeLinecap="round">
                {[0, 72, 144, 216, 288].map((angle) => (
                  <path key={angle} d={`M${x} 112v-12`} transform={`rotate(${angle} ${x} 112)`} />
                ))}
              </g>
              <circle cx={x} cy="112" r="3.5" fill="#4b5553" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

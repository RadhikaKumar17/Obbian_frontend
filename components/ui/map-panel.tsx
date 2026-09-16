"use client";

import "leaflet/dist/leaflet.css";
import { money } from "@/lib/data";
import type { Tracking, Vehicle } from "@/lib/types";
import type { Layer, Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";

type LatLng = { lat: number; lng: number };

export default function MapPanel({
  tracking = false,
  info = null,
  pickup = null,
  vehicles = [],
  origin = null,
  radiusKm = 10,
  onOriginChange,
}: {
  tracking?: boolean;
  info?: Tracking | null;
  pickup?: LatLng | null;
  vehicles?: Vehicle[];
  origin?: LatLng | null;
  radiusKm?: number;
  onOriginChange?: (coords: LatLng) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layersRef = useRef<Record<string, Layer>>({});
  const onOriginChangeRef = useRef(onOriginChange);
  onOriginChangeRef.current = onOriginChange;

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;
    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;
      map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([28.6328, 77.2197], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      mapRef.current = map;
      map.on("click", (e) => onOriginChangeRef.current?.({ lat: e.latlng.lat, lng: e.latlng.lng }));
    });
    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (tracking) return;
    let cancelled = false;
    import("leaflet").then((L) => {
      const map = mapRef.current;
      if (cancelled || !map) return;
      Object.values(layersRef.current).forEach((layer) => map.removeLayer(layer));
      layersRef.current = {};
      if (origin) {
        layersRef.current.origin = L.marker([origin.lat, origin.lng], {
          icon: L.divIcon({ className: "", html: '<div style="font-size:26px">📍</div>', iconSize: [26, 26], iconAnchor: [13, 26] }),
        }).addTo(map).bindPopup("Search location");
        layersRef.current.radius = L.circle([origin.lat, origin.lng], {
          radius: radiusKm * 1000,
          color: "#2563eb",
          fillOpacity: 0.06,
        }).addTo(map);
        map.setView([origin.lat, origin.lng], map.getZoom() < 11 ? 12 : map.getZoom());
      }
      vehicles.forEach((v) => {
        layersRef.current[`vehicle-${v.id}`] = L.marker([v.lat, v.lng], {
          icon: L.divIcon({ className: "", html: '<div style="font-size:24px">🚙</div>', iconSize: [24, 24], iconAnchor: [12, 12] }),
        }).addTo(map).bindPopup(`<strong>${v.name}</strong><br/>${money(v.price)}/day · ${v.distance} km`);
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracking, origin?.lat, origin?.lng, radiusKm, vehicles]);

  useEffect(() => {
    if (!tracking) return;
    let cancelled = false;
    import("leaflet").then((L) => {
      const map = mapRef.current;
      if (cancelled || !map) return;
      Object.values(layersRef.current).forEach((layer) => map.removeLayer(layer));
      layersRef.current = {};
      if (pickup) {
        layersRef.current.pickup = L.marker([pickup.lat, pickup.lng], {
          icon: L.divIcon({ className: "", html: '<div style="font-size:26px">🏁</div>', iconSize: [26, 26], iconAnchor: [13, 26] }),
        }).addTo(map).bindPopup("Pickup point");
      }
      if (info?.lat != null && info?.lng != null) {
        layersRef.current.driver = L.marker([info.lat, info.lng], {
          icon: L.divIcon({ className: "", html: '<div style="font-size:26px">🚙</div>', iconSize: [26, 26], iconAnchor: [13, 13] }),
        }).addTo(map);
        if (pickup) {
          layersRef.current.line = L.polyline(
            [[info.lat, info.lng], [pickup.lat, pickup.lng]],
            { color: "#2563eb", dashArray: "6 8", weight: 2 },
          ).addTo(map);
          map.fitBounds([[info.lat, info.lng], [pickup.lat, pickup.lng]], { padding: [40, 40] });
        } else {
          map.setView([info.lat, info.lng], 14);
        }
      } else if (pickup) {
        map.setView([pickup.lat, pickup.lng], 13);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [tracking, pickup?.lat, pickup?.lng, info?.lat, info?.lng]);

  const status = info?.status ?? "Awaiting location";
  return (
    <section
      aria-label={tracking ? "Live vehicle tracking" : "Nearby vehicles map"}
      className={`relative overflow-hidden rounded-2xl border border-line ${tracking ? "min-h-[450px] lg:min-h-[650px]" : "min-h-[330px]"}`}
    >
      <div ref={containerRef} className="absolute inset-0" />
      <p className="pointer-events-none absolute right-5 top-5 z-[1000] rounded-full bg-white/90 px-3 py-1 text-[13px] font-semibold text-success shadow">
        ● {tracking ? status.toUpperCase() : `${vehicles.length} nearby`}
      </p>
      {tracking && (
        <p className="pointer-events-none absolute bottom-5 left-5 z-[1000] rounded-full bg-white/90 px-3 py-1 text-xs text-muted shadow">
          {info?.updatedAt ? `Updated ${new Date(info.updatedAt).toLocaleTimeString("en-IN")}` : "No location updates yet"}
        </p>
      )}
      {!tracking && onOriginChange && (
        <p className="pointer-events-none absolute bottom-5 right-5 z-[1000] rounded-full bg-white/90 px-3 py-1 text-xs text-muted shadow">
          Tap the map to search a different spot
        </p>
      )}
    </section>
  );
}

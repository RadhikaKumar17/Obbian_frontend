"use client";

import { money } from "@/lib/data";
import { loadGoogleMaps } from "@/lib/google-maps";
import type { Tracking, Vehicle } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

type LatLng = { lat: number; lng: number };
const valid = (point: LatLng) => Number.isFinite(point.lat) && Number.isFinite(point.lng) && Math.abs(point.lat) <= 90 && Math.abs(point.lng) <= 180;

export default function MapPanel({ tracking = false, info = null, pickup = null, vehicles = [], origin = null, radiusKm = 10, onOriginChange, onVehicleSelect }: {
  tracking?: boolean; info?: Tracking | null; pickup?: LatLng | null; vehicles?: Vehicle[];
  origin?: LatLng | null; radiusKm?: number; onOriginChange?: (coords: LatLng) => void;
  onVehicleSelect?: (vehicle: Vehicle) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef(new Map<string, google.maps.marker.AdvancedMarkerElement>());
  const driver = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const position = useRef<LatLng | null>(null);
  const callbacks = useRef({ onOriginChange, onVehicleSelect });
  callbacks.current = { onOriginChange, onVehicleSelect };
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [follow, setFollow] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let disposed = false;
    const fail = () => setError('Map unavailable. You can still browse and reserve vehicles.');
    window.addEventListener('obbian-map-error', fail);
    loadGoogleMaps().then(() => {
      if (disposed || !container.current) return;
      map.current = new google.maps.Map(container.current, {
        center: { lat: 28.6328, lng: 77.2197 }, zoom: 12,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID',
        gestureHandling: 'cooperative', streetViewControl: false, mapTypeControl: false,
      });
      map.current.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (!tracking && event.latLng) callbacks.current.onOriginChange?.(event.latLng.toJSON());
      });
      map.current.addListener('dragstart', () => setFollow(false));
      setReady(true);
    }).catch((err: Error) => { if (!disposed) setError(err.message); });
    return () => {
      disposed = true;
      window.removeEventListener('obbian-map-error', fail);
      if (map.current) google.maps.event.clearInstanceListeners(map.current);
      map.current = null;
    };
  }, [tracking]);

  useEffect(() => {
    if (!ready || !map.current || tracking) return;
    const active = new Set(vehicles.map(v => v.id));
    for (const [id, marker] of markers.current) {
      if (!active.has(id)) { marker.map = null; markers.current.delete(id); }
    }
    for (const vehicle of vehicles) {
      if (!valid(vehicle)) continue;
      let marker = markers.current.get(vehicle.id);
      if (!marker) {
        marker = new google.maps.marker.AdvancedMarkerElement({ map: map.current });
        markers.current.set(vehicle.id, marker);
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'flex items-center gap-2 rounded-2xl border border-blue-200 bg-white py-2 pl-2 pr-3 text-left shadow-md transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600';
      const thumbnail = document.createElement('span');
      thumbnail.className = 'flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-3xl';
      thumbnail.setAttribute('aria-hidden', 'true');
      thumbnail.textContent = '🚙';
      if (vehicle.imageUrl) {
        const image = document.createElement('img');
        image.src = vehicle.imageUrl;
        image.alt = '';
        image.width = 56;
        image.height = 44;
        image.className = 'h-full w-full object-contain';
        image.onerror = () => { thumbnail.textContent = '🚙'; };
        thumbnail.replaceChildren(image);
      }
      const label = document.createElement('span');
      label.className = 'flex flex-col gap-0.5';
      const name = document.createElement('span');
      name.className = 'max-w-36 truncate text-xs font-medium text-slate-600';
      name.textContent = vehicle.name;
      const price = document.createElement('span');
      price.className = 'whitespace-nowrap text-sm font-bold text-blue-700';
      price.textContent = `${money(vehicle.price)}/day`;
      label.append(name, price);
      button.append(thumbnail, label);
      button.setAttribute('aria-label', `${vehicle.name}, ${money(vehicle.price)} per day, ${vehicle.distance} km away`);
      button.onclick = () => callbacks.current.onVehicleSelect?.(vehicle);
      marker.content = button;
      marker.title = `${vehicle.name} · ${vehicle.distance} km away`;
      marker.position = { lat: vehicle.lat, lng: vehicle.lng };
    }
  }, [ready, tracking, vehicles]);

  useEffect(() => () => { for (const marker of markers.current.values()) marker.map = null; markers.current.clear(); }, []);

  useEffect(() => {
    if (!ready || !map.current || tracking || !origin || !valid(origin)) return;
    const marker = new google.maps.marker.AdvancedMarkerElement({ map: map.current, position: origin, title: 'Search location' });
    const circle = new google.maps.Circle({ map: map.current, center: origin, radius: Math.max(0, radiusKm) * 1000, strokeColor: '#2563eb', strokeWeight: 1, fillColor: '#2563eb', fillOpacity: 0.07, clickable: false });
    map.current.panTo(origin);
    return () => { marker.map = null; circle.setMap(null); };
  }, [ready, tracking, origin?.lat, origin?.lng, radiusKm]);

  useEffect(() => {
    if (!ready || !map.current || !tracking || !pickup || !valid(pickup)) return;
    const marker = new google.maps.marker.AdvancedMarkerElement({ map: map.current, position: pickup, title: 'Pickup point' });
    if (!position.current) map.current.panTo(pickup);
    return () => { marker.map = null; };
  }, [ready, tracking, pickup?.lat, pickup?.lng]);

  useEffect(() => {
    if (!ready || !map.current || !tracking || info?.lat == null || info.lng == null) return;
    const target = { lat: info.lat, lng: info.lng };
    if (!valid(target)) return;
    if (!driver.current) {
      const icon = document.createElement('div');
      icon.textContent = '🚙'; icon.style.fontSize = '32px';
      driver.current = new google.maps.marker.AdvancedMarkerElement({ map: map.current, position: target, content: icon, title: 'Vehicle location' });
    }
    const start = position.current ?? target;
    const started = performance.now();
    let frame = 0;
    const animate = (time: number) => {
      const fraction = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : Math.min(1, (time - started) / 1200);
      const longitudeDelta = ((target.lng - start.lng + 540) % 360) - 180;
      position.current = { lat: start.lat + (target.lat - start.lat) * fraction, lng: ((start.lng + longitudeDelta * fraction + 540) % 360) - 180 };
      if (driver.current) driver.current.position = position.current;
      if (fraction < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    if (follow) map.current.panTo(target);
    return () => cancelAnimationFrame(frame);
  }, [ready, tracking, info?.lat, info?.lng, follow]);

  useEffect(() => () => { if (driver.current) driver.current.map = null; }, []);
  useEffect(() => { if (!tracking) return; const timer = setInterval(() => setNow(Date.now()), 5000); return () => clearInterval(timer); }, [tracking]);
  const stale = !info?.updatedAt || now - Date.parse(info.updatedAt) > 15000;
  return (
    <section aria-label={tracking ? 'Live vehicle tracking' : 'Nearby vehicles map'} className={`relative overflow-hidden rounded-2xl border border-line ${tracking ? 'min-h-[450px] lg:min-h-[650px]' : 'min-h-[330px]'}`}>
      <div ref={container} className="absolute inset-0" />
      {(!ready || error) && <div role="status" className="absolute inset-0 grid place-items-center bg-slate-50 p-8 text-center text-sm text-muted">{error || 'Loading Google Maps…'}</div>}
      {ready && !error && <>
        <p className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/95 px-3 py-2 text-xs shadow">{tracking ? (stale ? 'Location update delayed' : info?.status || 'Live location') : `${vehicles.length} nearby`}</p>
        {tracking ? <button type="button" aria-pressed={follow} onClick={() => setFollow(!follow)} className="absolute left-3 top-3 rounded-full bg-white px-3 py-2 text-sm shadow">{follow ? 'Following vehicle' : 'Follow vehicle'}</button> : onOriginChange && <button type="button" onClick={() => { const center = map.current?.getCenter(); if (center) onOriginChange(center.toJSON()); }} className="absolute left-3 top-3 rounded-full bg-white px-3 py-2 text-sm shadow">Search this area</button>}
      </>}
    </section>
  );
}

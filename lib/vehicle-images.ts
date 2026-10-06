import type { Vehicle } from '@/lib/types';

/**
 * Photos bundled with the frontend, keyed by vehicle id. Drop a file into
 * `public/vehicles/` and register it here. A photo URL sent by the API
 * (`vehicle.imageUrl`) always wins; with neither, an illustration is drawn.
 */
const LOCAL_PHOTOS: Record<string, string> = {
  // creta: '/vehicles/creta.webp',
  // seltos: '/vehicles/seltos.webp',
  // nexon: '/vehicles/nexon.webp',
  // xuv300: '/vehicles/xuv300.webp',
};

export function vehiclePhoto(vehicle: Pick<Vehicle, 'id' | 'imageUrl'>): string | undefined {
  return vehicle.imageUrl || LOCAL_PHOTOS[vehicle.id];
}

const PAINTS = ['#eef0ee', '#c5cbcd', '#2f6b53', '#3a4147', '#a3342f', '#2f4d80'];

/** A stable paint colour per vehicle so illustrated cards are not identical. */
export function vehiclePaint(id: string): string {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PAINTS[hash % PAINTS.length];
}

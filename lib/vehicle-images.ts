import type { Vehicle } from '@/lib/types';

export type VehiclePhoto = {
  src: string;
  /** Enlarges the photo around `focus` so the car fills the frame. */
  zoom?: number;
  /** CSS position of the car within the photo, e.g. "48% 54%". */
  focus?: string;
};

/**
 * Photos keyed by vehicle id, used when the API sends no `imageUrl`.
 * Sources are free-licence stock photos (credits in README.md). To use your
 * own, put the file in `public/vehicles/` and point `src` at it.
 * Vehicles without an entry fall back to an illustration.
 */
const PHOTOS: Record<string, VehiclePhoto> = {
  creta: { src: 'https://images.unsplash.com/photo-1748214547184-d994bfe53322?w=960&h=540&fit=crop&q=75&auto=format' },
  seltos: { src: 'https://images.unsplash.com/photo-1659406189166-7c17fe5df12a?w=1440&h=810&fit=crop&q=75&auto=format', zoom: 1.6, focus: '52% 72%' },
  nexon: { src: 'https://images.pexels.com/photos/23534116/pexels-photo-23534116.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', zoom: 2, focus: '48% 54%' },
};

export function vehiclePhoto(vehicle: Pick<Vehicle, 'id' | 'imageUrl'>): VehiclePhoto | undefined {
  return vehicle.imageUrl ? { src: vehicle.imageUrl } : PHOTOS[vehicle.id];
}

const PAINTS = ['#eef0ee', '#c5cbcd', '#2f6b53', '#3a4147', '#a3342f', '#2f4d80'];

/** A stable paint colour per vehicle so illustrated cards are not identical. */
export function vehiclePaint(id: string): string {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PAINTS[hash % PAINTS.length];
}

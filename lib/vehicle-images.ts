import type { Vehicle } from '@/lib/types';

export type VehiclePhoto = {
  src: string;
  /** "contain" for studio shots on white, "cover" for scene photos. */
  fit: 'contain' | 'cover';
  /** Enlarges a scene photo around `focus` so the car fills the frame. */
  zoom?: number;
  /** CSS position of the car within the photo, e.g. "48% 54%". */
  focus?: string;
};

/**
 * Studio shots by body style, served from `public/vehicles/`. These are the
 * images from the Obbian design (car-suv.jpg, car-sedan.jpg, car-hatch.jpg).
 */
function studioShot(category: string): VehiclePhoto {
  const style = /hatch/i.test(category) ? 'hatch' : /sedan/i.test(category) ? 'sedan' : 'suv';
  return { src: `/vehicles/car-${style}.jpg`, fit: 'contain' };
}

/** Free-licence scene photos of specific models (credits in README.md). */
const MODEL_PHOTOS: Record<string, VehiclePhoto> = {
  creta: { src: 'https://images.unsplash.com/photo-1748214547184-d994bfe53322?w=960&h=540&fit=crop&q=75&auto=format', fit: 'cover' },
  seltos: { src: 'https://images.unsplash.com/photo-1659406189166-7c17fe5df12a?w=1440&h=810&fit=crop&q=75&auto=format', fit: 'cover', zoom: 1.6, focus: '52% 72%' },
  nexon: { src: 'https://images.pexels.com/photos/23534116/pexels-photo-23534116.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', fit: 'cover', zoom: 2, focus: '48% 54%' },
};

/**
 * Photo candidates for a vehicle, best first. The UI shows the first one that
 * loads: a photo from the API, then the studio shot for the body style, then a
 * scene photo of the model. If none load, an illustration is drawn.
 */
export function vehiclePhotos(vehicle: Pick<Vehicle, 'id' | 'category' | 'imageUrl'>): VehiclePhoto[] {
  const photos: VehiclePhoto[] = [];
  if (vehicle.imageUrl) photos.push({ src: vehicle.imageUrl, fit: 'cover' });
  photos.push(studioShot(vehicle.category));
  const model = MODEL_PHOTOS[vehicle.id];
  if (model) photos.push(model);
  return photos;
}

const PAINTS = ['#eef0ee', '#c5cbcd', '#2f6b53', '#3a4147', '#a3342f', '#2f4d80'];

/** A stable paint colour per vehicle so illustrated cards are not identical. */
export function vehiclePaint(id: string): string {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PAINTS[hash % PAINTS.length];
}

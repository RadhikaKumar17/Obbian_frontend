import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SearchResult, Vehicle } from "@/lib/types";

export type GeoPoint = { lat: number; lng: number };

function withOrigin(params: Record<string, string>, origin?: GeoPoint | null) {
  const query = new URLSearchParams(params);
  if (origin) {
    query.set("lat", String(origin.lat));
    query.set("lng", String(origin.lng));
  }
  return query.toString();
}

export function useVehicles(date: string, origin?: GeoPoint | null) {
  return useQuery({
    queryKey: ["vehicles", date, origin?.lat, origin?.lng],
    queryFn: () => api.get<Vehicle[]>(`/api/vehicles?${withOrigin({ date }, origin)}`),
    enabled: Boolean(date),
    placeholderData: keepPreviousData,
  });
}

export function useSearch(params: { date: string; budget: string; radius: string; sort: string; category: string; transmission: string; origin?: GeoPoint | null }) {
  const { date, budget, radius, sort, category, transmission, origin } = params;
  return useQuery({
    queryKey: ["search", date, budget, radius, sort, category, transmission, origin?.lat, origin?.lng],
    queryFn: () => api.get<SearchResult>(`/api/search?${withOrigin({ date, budget, radius, sort, category, transmission }, origin)}`),
    enabled: Boolean(date),
    placeholderData: keepPreviousData,
  });
}

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Booking, Tracking } from "@/lib/types";

export function useTracking(bookingId: string, pollMs: number) {
  const client = useQueryClient();
  return useQuery({
    queryKey: ["tracking", bookingId],
    queryFn: async () => {
      const data = await api.get<Tracking>(`/api/bookings/${encodeURIComponent(bookingId)}/tracking`);
      const previousTracking = client.getQueryData<Tracking>(["tracking", bookingId]);
      if (previousTracking?.updatedAt && (!data.updatedAt || Date.parse(previousTracking.updatedAt) > Date.parse(data.updatedAt))) return previousTracking;
      client.setQueryData<Booking[]>(["bookings"], (previous) =>
        previous?.map((b) => (b.id === bookingId && b.status !== data.bookingStatus ? { ...b, status: data.bookingStatus } : b)),
      );
      return data;
    },
    enabled: Boolean(bookingId),
    refetchInterval: pollMs,
  });
}

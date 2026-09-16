import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Booking, Tracking } from "@/lib/types";

export function useTracking(bookingId: string, pollMs: number) {
  const client = useQueryClient();
  return useQuery({
    queryKey: ["tracking", bookingId],
    queryFn: async () => {
      const data = await api.get<Tracking>(`/api/bookings/${encodeURIComponent(bookingId)}/tracking`);
      client.setQueryData<Booking[]>(["bookings"], (previous) =>
        previous?.map((b) => (b.id === bookingId && b.status !== data.bookingStatus ? { ...b, status: data.bookingStatus } : b)),
      );
      return data;
    },
    enabled: Boolean(bookingId),
    refetchInterval: pollMs,
  });
}

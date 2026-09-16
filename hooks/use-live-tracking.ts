import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Booking, Tracking } from "@/lib/types";

const WS_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/^http/, "ws");

export function useLiveTracking(bookingId: string) {
  const client = useQueryClient();

  useEffect(() => {
    if (!bookingId) return;
    const ws = new WebSocket(`${WS_URL}/ws/tracking`);
    ws.onopen = () => ws.send(JSON.stringify({ type: "subscribe", bookingId }));
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "tracking" && message.data?.bookingId === bookingId) {
          const data: Tracking = message.data;
          client.setQueryData<Tracking>(["tracking", bookingId], data);
          // The simulator can transition the booking's own status (e.g. Confirmed -> Active)
          // server-side; keep the bookings list in sync without waiting on a refetch.
          client.setQueryData<Booking[]>(["bookings"], (previous) =>
            previous?.map((b) => (b.id === bookingId && b.status !== data.bookingStatus ? { ...b, status: data.bookingStatus } : b)),
          );
        }
      } catch {
        /* ignore malformed frames */
      }
    };
    return () => ws.close();
  }, [bookingId, client]);
}

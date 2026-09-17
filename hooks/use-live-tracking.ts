import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Booking, Tracking } from "@/lib/types";

const WS_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/^http/, "ws").replace(/\/$/, '');

export function useLiveTracking(bookingId: string) {
  const client = useQueryClient();
  useEffect(() => {
    if (!bookingId) return;
    let disposed = false;
    let attempts = 0;
    let socket: WebSocket | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    function connect() {
      if (disposed) return;
      socket = new WebSocket(`${WS_URL}/ws/tracking`);
      socket.onopen = () => {
        attempts = 0;
        socket?.send(JSON.stringify({ type: "subscribe", bookingId }));
        void client.invalidateQueries({ queryKey: ['tracking', bookingId] });
      };
      socket.onmessage = event => {
        if (disposed) return;
        try {
          const message = JSON.parse(event.data);
          if (message.type !== 'tracking' || message.data?.bookingId !== bookingId) return;
          const data: Tracking = message.data;
          if (data.lat !== null && (!Number.isFinite(data.lat) || Math.abs(data.lat) > 90)) return;
          if (data.lng !== null && (!Number.isFinite(data.lng) || Math.abs(data.lng) > 180)) return;
          const previous = client.getQueryData<Tracking>(['tracking', bookingId]);
          if (!data.updatedAt || !Number.isFinite(Date.parse(data.updatedAt))) return;
          if (previous?.updatedAt && Date.parse(previous.updatedAt) > Date.parse(data.updatedAt)) return;
          client.setQueryData<Tracking>(['tracking', bookingId], data);
          client.setQueryData<Booking[]>(['bookings'], items => items?.map(b => b.id === bookingId ? { ...b, status: data.bookingStatus } : b));
        } catch { /* Ignore malformed frames; HTTP polling remains available. */ }
      };
      socket.onerror = () => socket?.close();
      socket.onclose = () => {
        if (!disposed) timer = setTimeout(connect, Math.min(30000, 1000 * 2 ** attempts++));
      };
    }
    connect();
    return () => { disposed = true; clearTimeout(timer); socket?.close(); };
  }, [bookingId, client]);
}

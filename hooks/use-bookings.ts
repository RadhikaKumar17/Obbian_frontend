import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Booking } from "@/lib/types";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => api.get<Booking[]>("/api/bookings"),
  });
}

export type CreateBookingInput = {
  vehicleId: string;
  date: string;
  name: string;
  mobile: string;
  licence: string;
  paymentMethod: string;
  termsAccepted: boolean;
};

export function useCreateBooking() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ input, idempotencyKey }: { input: CreateBookingInput; idempotencyKey: string }) =>
      api.post<Booking>("/api/bookings", input, { "Idempotency-Key": idempotencyKey }),
    onSuccess: (booking) => {
      client.setQueryData<Booking[]>(["bookings"], (previous) =>
        previous ? [booking, ...previous.filter((b) => b.id !== booking.id)] : [booking],
      );
    },
  });
}

export function useUpdateBooking() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action, date }: { id: string; action: "cancel" | "reschedule" | "complete"; date?: string }) =>
      api.patch<Booking>(`/api/bookings/${encodeURIComponent(id)}`, { action, date }),
    onSuccess: (booking) => {
      client.setQueryData<Booking[]>(["bookings"], (previous) =>
        previous ? previous.map((b) => (b.id === booking.id ? booking : b)) : previous,
      );
    },
  });
}

export async function downloadReceipt(id: string) {
  const receipt = await api.get<string>(`/api/bookings/${encodeURIComponent(id)}/receipt`);
  const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${id}-receipt.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

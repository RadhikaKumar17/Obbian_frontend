import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Ticket } from "@/lib/types";

export function useCreateTicket() {
  return useMutation({
    mutationFn: (input: { email: string; message: string; bookingId?: string | null }) =>
      api.post<Ticket>("/api/support/tickets", input),
  });
}

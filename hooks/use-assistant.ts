import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { AssistantReply, RentalQuote } from '@/lib/types';

export function useAssistant() {
  return useMutation({
    mutationFn: (input: { message: string; history: {role: 'user' | 'assistant'; content: string}[]; context: Record<string, unknown> }) => api.post<AssistantReply>('/api/assistant', input),
  });
}

export function useAssistantChatHistory() {
  return useQuery({
    queryKey: ['chats', 'assistant'],
    queryFn: () => api.get<({ question: string } & AssistantReply)[]>('/api/chats/assistant'),
    staleTime: Infinity,
  });
}

export function useRentalQuote(vehicleId: string, date: string) {
  return useQuery({
    queryKey: ['quote', vehicleId, date],
    queryFn: () => api.get<RentalQuote>(`/api/vehicles/${encodeURIComponent(vehicleId)}/quote?${new URLSearchParams({date})}`),
    enabled: Boolean(vehicleId && date),
    staleTime: 0,
  });
}

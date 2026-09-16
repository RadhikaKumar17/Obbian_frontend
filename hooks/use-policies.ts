import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Policy } from "@/lib/types";

export function usePolicies() {
  return useQuery({
    queryKey: ["policies"],
    queryFn: () => api.get<Policy[]>("/api/policies"),
    staleTime: Infinity,
  });
}

export function useAskPolicy() {
  return useMutation({
    mutationFn: (question: string) =>
      api.get<Policy | null>(`/api/policies/answer?q=${encodeURIComponent(question)}`),
  });
}

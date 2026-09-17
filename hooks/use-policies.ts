import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Policy, RagAnswer } from "@/lib/types";

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
      api.post<RagAnswer>("/api/policies/ask", { question }),
  });
}

export function usePolicyChatHistory() {
  return useQuery({
    queryKey: ["chats", "policy"],
    queryFn: () => api.get<({ question: string } & RagAnswer)[]>("/api/chats/policy"),
    staleTime: Infinity,
  });
}

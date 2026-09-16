import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useSaved() {
  return useQuery({
    queryKey: ["saved"],
    queryFn: () => api.get<string[]>("/api/saved"),
  });
}

export function useToggleSave() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, save }: { id: string; save: boolean }) =>
      api.put<string[]>(`/api/saved/${encodeURIComponent(id)}`, { save }),
    onSuccess: (saved) => client.setQueryData(["saved"], saved),
  });
}

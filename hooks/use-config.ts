import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Config } from "@/lib/types";

export function useConfig() {
  return useQuery({
    queryKey: ["config"],
    queryFn: () => api.get<Config>("/api/config"),
    staleTime: Infinity,
  });
}

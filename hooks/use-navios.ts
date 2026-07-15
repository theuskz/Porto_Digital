"use client";

import { useQuery } from "@tanstack/react-query";
import { Navio } from "@/types/navios";

export function useNavios() {
  return useQuery<Navio[]>({
    queryKey: ["navios"],

    queryFn: async () => {
      const response = await fetch("/api/navios", {
        cache: "no-store",
      });

      if (!response.ok) {
        const resultado = await response.json().catch(() => null);

        throw new Error(
          resultado?.error ||
          `Erro ${response.status} ao carregar navios.`
        );
      }

      return response.json();
    },
  });
}
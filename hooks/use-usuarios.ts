"use client";

import { useQuery } from "@tanstack/react-query";

import { Usuario } from "@/types/usuarios";

export function useUsuarios() {
  return useQuery<Usuario[]>({
    queryKey: ["usuarios"],

    queryFn: async () => {
      const response = await fetch("/api/usuarios", {
        cache: "no-store",
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.error ||
            "Erro ao carregar usuários."
        );
      }

      return resultado;
    },
  });
}
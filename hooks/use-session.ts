"use client";

import { useQuery } from "@tanstack/react-query";

export interface UsuarioSessao {
    id: number;
    nome: string;
    usuario: string;
    nivel: string;
}

export function useSession() {
    return useQuery<UsuarioSessao>({
        queryKey: ["session"],

        queryFn: async () => {
            const response = await fetch("/api/auth/me", {
                cache: "no-store",
            });

            const resultado = await response.json();

            if (!response.ok) {
                throw new Error(
                    resultado.error ||
                    "Não foi possível carregar a sessão."
                );
            }

            return resultado;
        },

        retry: false,
    });
}
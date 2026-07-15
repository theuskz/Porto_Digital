"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteNavio() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/api/navios/${id}`, {
                method: "DELETE",
            });

            const resultado = await response.json();

            if (!response.ok) {
                throw new Error(
                    resultado.error || "Erro ao excluir navio."
                );
            }

            return resultado;
        },

        onSuccess() {
            toast.success("Navio excluído com sucesso!");

            queryClient.invalidateQueries({
                queryKey: ["navios"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });
        },

        onError(error: Error) {
            toast.error(error.message);
        },
    });
}
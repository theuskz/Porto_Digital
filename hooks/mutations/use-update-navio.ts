"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NavioFormData } from "@/lib/validations/navio";

interface UpdateNavioData {
    id: number;
    data: NavioFormData;
}

export function useUpdateNavio() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UpdateNavioData) => {
            const response = await fetch(`/api/navios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resultado = await response.json();

            if (!response.ok) {
                throw new Error(
                    resultado.error || "Erro ao atualizar navio."
                );
            }

            return resultado;
        },

        onSuccess() {
            toast.success("Navio atualizado com sucesso!");

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
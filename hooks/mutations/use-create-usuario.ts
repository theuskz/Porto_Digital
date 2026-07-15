"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { UsuarioFormData } from "@/lib/validations/usuario";

export function useCreateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      dados: UsuarioFormData
    ) => {
      const response = await fetch(
        "/api/usuarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.error ||
            "Erro ao cadastrar usuário."
        );
      }

      return resultado;
    },

    onSuccess() {
      toast.success(
        "Usuário cadastrado com sucesso!"
      );

      queryClient.invalidateQueries({
        queryKey: ["usuarios"],
      });
    },

    onError(error: Error) {
      toast.error(error.message);
    },
  });
}
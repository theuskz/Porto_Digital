"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateNavio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/navios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro.error);
      }

      return res.json();
    },

    onSuccess() {
      toast.success("Navio cadastrado com sucesso!");

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
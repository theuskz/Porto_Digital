"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateNavio } from "@/hooks/mutations/use-create-navio";
import { useUpdateNavio } from "@/hooks/mutations/use-update-navio";

import {
  navioSchema,
  NavioFormData,
} from "@/lib/validations/navio";

import { Navio } from "@/types/navios";

interface Props {
  navio?: Navio;
  onSuccess?: () => void;
}

export default function NavioForm({
  navio,
  onSuccess,
}: Props) {
  const createMutation = useCreateNavio();
  const updateMutation = useUpdateNavio();

  const editando = Boolean(navio);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NavioFormData>({
    resolver: zodResolver(navioSchema),

    defaultValues: {
      nome: navio?.nome ?? "",
      eh_perecivel: navio?.eh_perecivel ?? false,
      containers: navio?.containers ?? 1,
      peso: navio?.peso ?? 1,
    },
  });

  useEffect(() => {
    reset({
      nome: navio?.nome ?? "",
      eh_perecivel: navio?.eh_perecivel ?? false,
      containers: navio?.containers ?? 1,
      peso: navio?.peso ?? 1,
    });
  }, [navio, reset]);

  function onSubmit(data: NavioFormData) {
    if (navio) {
      updateMutation.mutate(
        {
          id: navio.id,
          data,
        },
        {
          onSuccess() {
            onSuccess?.();
          },
        }
      );

      return;
    }

    createMutation.mutate(data, {
      onSuccess() {
        reset();
        onSuccess?.();
      },
    });
  }

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="nome"
          className="text-sm font-medium"
        >
          Nome da embarcação
        </label>

        <input
          id="nome"
          type="text"
          placeholder="Ex: Alpha Cruiser"
          {...register("nome")}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500"
        />

        {errors.nome && (
          <p className="text-sm text-red-400">
            {errors.nome.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="containers"
            className="text-sm font-medium"
          >
            Containers
          </label>

          <input
            id="containers"
            type="number"
            min={1}
            step={1}
            {...register("containers", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500"
          />

          {errors.containers && (
            <p className="text-sm text-red-400">
              {errors.containers.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="peso"
            className="text-sm font-medium"
          >
            Peso em kg
          </label>

          <input
            id="peso"
            type="number"
            min={0.1}
            step={100}
            {...register("peso", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:border-blue-500"
          />

          {errors.peso && (
            <p className="text-sm text-red-400">
              {errors.peso.message}
            </p>
          )}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-700 bg-slate-900 px-4 py-3">
        <input
          type="checkbox"
          {...register("eh_perecivel")}
          className="h-4 w-4 accent-blue-600"
        />

        <div>
          <p className="text-sm font-medium">
            Carga perecível
          </p>

          <p className="text-xs text-slate-400">
            Aplica adicional tarifário de 15%.
          </p>
        </div>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "Salvando..."
          : editando
            ? "Salvar alterações"
            : "Homologar e registrar"}
      </button>
    </form>
  );
}
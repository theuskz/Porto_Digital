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
      containers: navio?.containers,
      peso: navio?.peso,
    },
  });

  useEffect(() => {
    reset({
      nome: navio?.nome ?? "",
      eh_perecivel: navio?.eh_perecivel ?? false,
      containers: navio?.containers,
      peso: navio?.peso,
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
        reset({
          nome: "",
          eh_perecivel: false,
          containers: undefined,
          peso: undefined,
        });

        onSuccess?.();
      },
    });
  }

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending;

  const inputClassName =
    "w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="nome"
          className="text-sm font-medium text-slate-200"
        >
          Nome da embarcação
        </label>

        <input
          id="nome"
          type="text"
          placeholder="Ex: Alpha Cruiser"
          {...register("nome")}
          className={inputClassName}
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
            className="text-sm font-medium text-slate-200"
          >
            Containers
          </label>

          <input
            id="containers"
            type="number"
            min={1}
            step={1}
            placeholder="Ex: 450"
            {...register("containers", {
              valueAsNumber: true,
            })}
            className={inputClassName}
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
            className="text-sm font-medium text-slate-200"
          >
            Peso em kg
          </label>

          <input
            id="peso"
            type="number"
            min={1}
            step={1}
            placeholder="Ex: 69000"
            {...register("peso", {
              valueAsNumber: true,
            })}
            className={inputClassName}
          />

          {errors.peso && (
            <p className="text-sm text-red-400">
              {errors.peso.message}
            </p>
          )}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-4 transition hover:border-slate-600">
        <input
          type="checkbox"
          {...register("eh_perecivel")}
          className="h-4 w-4 rounded border-slate-600 accent-blue-600"
        />

        <div>
          <p className="text-sm font-medium text-slate-200">
            Carga perecível
          </p>

          <p className="text-xs text-slate-500">
            Aplica adicional tarifário de 15%.
          </p>
        </div>
      </label>

      {errors.eh_perecivel && (
        <p className="text-sm text-red-400">
          {errors.eh_perecivel.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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
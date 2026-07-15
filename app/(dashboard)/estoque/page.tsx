"use client";

import NaviosTable from "@/components/navios/navios-table";
import { useNavios } from "@/hooks/use-navios";

export default function EstoquePage() {
  const {
    data: navios,
    isLoading,
    isError,
    error,
  } = useNavios();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Carregando estoque...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-6">
        <p className="font-medium text-red-400">
          Erro ao carregar o estoque.
        </p>

        <p className="mt-2 text-sm text-red-300">
          {error instanceof Error
            ? error.message
            : "Erro desconhecido."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Estoque
        </h1>

        <p className="mt-2 text-slate-400">
          Consulte, edite e remova as embarcações cadastradas.
        </p>
      </div>

      <NaviosTable navios={navios ?? []} />
    </div>
  );
}
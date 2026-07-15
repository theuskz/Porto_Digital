"use client";

import { useMemo, useState } from "react";
import { Search, Ship } from "lucide-react";

import { Navio } from "@/types/navios";
import EditNavioDialog from "./edit-navio-dialog";
import DeleteNavioDialog from "./delete-navio-dialog";

interface Props {
  navios: Navio[];
}

export default function NaviosTable({ navios }: Props) {
  const [busca, setBusca] = useState("");

  const naviosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return navios;
    }

    return navios.filter((navio) =>
      navio.nome.toLowerCase().includes(termo)
    );
  }, [busca, navios]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="search"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Pesquisar embarcação..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Ship className="h-4 w-4" />

          <span>
            {naviosFiltrados.length} registro
            {naviosFiltrados.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40 shadow-sm">
        <table className="w-full min-w-[980px]">
          <thead className="bg-slate-900/90">
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-5 py-4">Navio</th>
              <th className="px-5 py-4">Containers</th>
              <th className="px-5 py-4">Peso</th>
              <th className="px-5 py-4">Eficiência</th>
              <th className="px-5 py-4">Tipo</th>
              <th className="px-5 py-4">Valor</th>
              <th className="px-5 py-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {naviosFiltrados.map((navio) => {
              const eficiencia =
                navio.containers > 0
                  ? navio.peso / navio.containers
                  : 0;

              return (
                <tr
                  key={navio.id}
                  className="border-t border-slate-800/80 text-sm text-slate-300 transition hover:bg-slate-900/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <Ship className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-100">
                          {navio.nome}
                        </p>

                        <p className="text-xs text-slate-500">
                          ID #{navio.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {navio.containers.toLocaleString("pt-BR")}
                  </td>

                  <td className="px-5 py-4">
                    {navio.peso.toLocaleString("pt-BR")} kg
                  </td>

                  <td className="px-5 py-4">
                    {eficiencia.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    kg/cont.
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        navio.eh_perecivel
                          ? "inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400"
                          : "inline-flex rounded-full border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300"
                      }
                    >
                      {navio.eh_perecivel
                        ? "Perecível"
                        : "Comum"}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-semibold text-blue-400">
                    {navio.valor_total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <EditNavioDialog navio={navio} />

                      <DeleteNavioDialog navio={navio} />
                    </div>
                  </td>
                </tr>
              );
            })}

            {naviosFiltrados.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-500">
                      <Ship className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="font-medium text-slate-300">
                        Nenhum navio encontrado
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Tente pesquisar por outro nome.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
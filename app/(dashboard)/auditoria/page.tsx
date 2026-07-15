"use client";

import {
  AlertTriangle,
  BarChart3,
  Boxes,
  CircleDollarSign,
  ShieldCheck,
  Ship,
  Weight,
} from "lucide-react";

import { useNavios } from "@/hooks/use-navios";

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarNumero(valor: number, casas = 1) {
  return valor.toLocaleString("pt-BR", {
    maximumFractionDigits: casas,
  });
}

export default function AuditoriaPage() {
  const {
    data: navios = [],
    isLoading,
    isError,
    error,
  } = useNavios();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Compilando indicadores operacionais...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6">
        <p className="font-medium text-red-400">
          Erro ao carregar a auditoria.
        </p>

        <p className="mt-2 text-sm text-red-300">
          {error instanceof Error
            ? error.message
            : "Erro desconhecido."}
        </p>
      </div>
    );
  }

  const pereciveis = navios.filter(
    (navio) => navio.eh_perecivel
  );

  const comuns = navios.filter(
    (navio) => !navio.eh_perecivel
  );

  const mediaPereciveis =
    pereciveis.length > 0
      ? pereciveis.reduce(
        (total, navio) =>
          total + navio.valor_total,
        0
      ) / pereciveis.length
      : 0;

  const mediaComuns =
    comuns.length > 0
      ? comuns.reduce(
        (total, navio) =>
          total + navio.valor_total,
        0
      ) / comuns.length
      : 0;

  const pesoTotal = navios.reduce(
    (total, navio) => total + navio.peso,
    0
  );

  const containersTotal = navios.reduce(
    (total, navio) =>
      total + navio.containers,
    0
  );

  const eficienciaMedia =
    containersTotal > 0
      ? pesoTotal / containersTotal
      : 0;

  const faturamentoTotal = navios.reduce(
    (total, navio) =>
      total + navio.valor_total,
    0
  );

  const sobrecarregados = navios.filter(
    (navio) => navio.peso > 50000
  );

  const ranking = [...navios]
    .sort(
      (a, b) =>
        b.valor_total - a.valor_total
    )
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <BarChart3 className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Auditoria Operacional
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Indicadores, alertas e desempenho das operações portuárias.
          </p>
        </div>
      </header>

      {navios.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
          <Ship className="mx-auto h-10 w-10 text-slate-600" />

          <h2 className="mt-4 font-semibold text-slate-200">
            Nenhum dado operacional
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Cadastre navios para gerar os indicadores.
          </p>
        </div>
      ) : (
        <>
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Média perecíveis
                </p>

                <CircleDollarSign className="h-5 w-5 text-emerald-400" />
              </div>

              <p className="mt-4 text-2xl font-bold">
                {formatarMoeda(mediaPereciveis)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {pereciveis.length} carga(s) perecível(is)
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Média cargas comuns
                </p>

                <CircleDollarSign className="h-5 w-5 text-blue-400" />
              </div>

              <p className="mt-4 text-2xl font-bold">
                {formatarMoeda(mediaComuns)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {comuns.length} carga(s) comum(ns)
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Eficiência média
                </p>

                <Boxes className="h-5 w-5 text-violet-400" />
              </div>

              <p className="mt-4 text-2xl font-bold">
                {formatarNumero(
                  eficienciaMedia,
                  2
                )}{" "}
                kg/cont.
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {containersTotal.toLocaleString(
                  "pt-BR"
                )}{" "}
                containers
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Faturamento total
                </p>

                <Weight className="h-5 w-5 text-amber-400" />
              </div>

              <p className="mt-4 text-2xl font-bold">
                {formatarMoeda(faturamentoTotal)}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {formatarNumero(pesoTotal, 0)} kg movimentados
              </p>
            </article>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">
                  Inconformidades de peso
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Embarcações acima do limite operacional de 50 toneladas.
                </p>
              </div>

              {sobrecarregados.length === 0 ? (
                <div className="flex gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-400" />

                  <div>
                    <p className="font-semibold text-emerald-400">
                      Integridade operacional estável
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Nenhuma embarcação ultrapassa o limite de 50 toneladas.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {sobrecarregados.map(
                    (navio) => (
                      <div
                        key={navio.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-400" />

                          <div>
                            <p className="font-medium text-slate-100">
                              {navio.nome}
                            </p>

                            <p className="text-xs text-slate-500">
                              Aviso de sobrecarga
                            </p>
                          </div>
                        </div>

                        <p className="font-semibold text-amber-400">
                          {formatarNumero(
                            navio.peso,
                            0
                          )}{" "}
                          kg
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">
                  Maiores despachos
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Embarcações com maior valor de despacho.
                </p>
              </div>

              <div className="space-y-3">
                {ranking.map((navio, index) => (
                  <div
                    key={navio.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 font-semibold text-blue-400">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-medium text-slate-100">
                          {navio.nome}
                        </p>

                        <p className="text-xs text-slate-500">
                          {formatarNumero(
                            navio.peso,
                            0
                          )}{" "}
                          kg
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-blue-400">
                      {formatarMoeda(
                        navio.valor_total
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
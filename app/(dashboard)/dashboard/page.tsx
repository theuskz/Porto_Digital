"use client";

import KpiCard from "@/components/dashboard/kpi-card";
import DashboardCharts from "@/components/dashboard/dashboard-charts";

import { useDashboard } from "@/hooks/use-dashboard";
import { useNavios } from "@/hooks/use-navios";

export default function DashboardPage() {
    const {
        data: dashboard,
        isLoading: carregandoDashboard,
    } = useDashboard();

    const {
        data: navios = [],
        isLoading: carregandoNavios,
    } = useNavios();

    if (carregandoDashboard || carregandoNavios) {
        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-slate-400">
                    Carregando dashboard...
                </p>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6">
                <p className="text-red-400">
                    Não foi possível carregar os dados do dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Visão geral das operações portuárias.
                </p>
            </header>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <KpiCard
                    titulo="Navios"
                    valor={String(dashboard.totalNavios)}
                />

                <KpiCard
                    titulo="Perecíveis"
                    valor={String(dashboard.pereciveis)}
                />

                <KpiCard
                    titulo="Peso total"
                    valor={`${dashboard.peso.toLocaleString("pt-BR")} kg`}
                />

                <KpiCard
                    titulo="Faturamento"
                    valor={dashboard.faturamento.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                />
            </section>

            <DashboardCharts navios={navios} />
        </div>
    );
}
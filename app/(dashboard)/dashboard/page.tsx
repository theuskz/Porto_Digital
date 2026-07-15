"use client";

import KpiCard from "@/components/dashboard/kpi-card";
import { useDashboard } from "@/hooks/use-dashboard";

export default function DashboardPage() {

    const { data } = useDashboard();

    if (!data) {

        return <>Carregando...</>

    }

    return (

        <div className="space-y-8">

            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>

            <div className="grid md:grid-cols-4 gap-6">

                <KpiCard
                    titulo="Navios"
                    valor={String(data.totalNavios)}
                />

                <KpiCard
                    titulo="Perecíveis"
                    valor={String(data.pereciveis)}
                />

                <KpiCard
                    titulo="Peso Total"
                    valor={`${data.peso.toLocaleString()} kg`}
                />

                <KpiCard
                    titulo="Faturamento"
                    valor={`R$ ${data.faturamento.toFixed(2)}`}
                />

            </div>

        </div>

    )

}
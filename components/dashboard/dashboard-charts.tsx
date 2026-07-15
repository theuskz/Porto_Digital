"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Navio } from "@/types/navios";

interface Props {
    navios: Navio[];
}

const CORES = ["#3b82f6", "#10b981"];

export default function DashboardCharts({ navios }: Props) {
    const dadosPeso = navios
        .slice()
        .sort((a, b) => b.peso - a.peso)
        .slice(0, 6)
        .map((navio) => ({
            nome: navio.nome,
            peso: navio.peso,
        }));

    const pereciveis = navios.filter(
        (navio) => navio.eh_perecivel
    ).length;

    const comuns = navios.length - pereciveis;

    const dadosTipo = [
        {
            nome: "Perecíveis",
            quantidade: pereciveis,
        },
        {
            nome: "Comuns",
            quantidade: comuns,
        },
    ];

    return (
        <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-100">
                        Maiores cargas
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Peso total dos seis navios mais carregados.
                    </p>
                </div>

                <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={dadosPeso}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 10,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="nome"
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                interval={0}
                                angle={-15}
                                textAnchor="end"
                            />

                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(valor) =>
                                    `${Number(valor) / 1000}t`
                                }
                            />

                            <Tooltip
                                cursor={{
                                    fill: "rgba(51, 65, 85, 0.25)",
                                }}
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "10px",
                                    color: "#f8fafc",
                                }}
                                formatter={(valor) => [
                                    `${Number(valor).toLocaleString("pt-BR")} kg`,
                                    "Peso",
                                ]}
                            />

                            <Bar
                                dataKey="peso"
                                fill="#3b82f6"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-slate-100">
                        Distribuição das cargas
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Comparação entre cargas perecíveis e comuns.
                    </p>
                </div>

                <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dadosTipo}
                                dataKey="quantidade"
                                nameKey="nome"
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={100}
                                paddingAngle={4}
                            >
                                {dadosTipo.map((item, index) => (
                                    <Cell
                                        key={item.nome}
                                        fill={CORES[index]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "10px",
                                    color: "#f8fafc",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-4">
                    {dadosTipo.map((item, index) => (
                        <div
                            key={item.nome}
                            className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="h-3 w-3 rounded-full"
                                    style={{
                                        backgroundColor: CORES[index],
                                    }}
                                />

                                <p className="text-sm text-slate-400">
                                    {item.nome}
                                </p>
                            </div>

                            <p className="mt-2 text-2xl font-semibold text-slate-100">
                                {item.quantidade}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
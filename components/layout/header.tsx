"use client";

import { useSession } from "@/hooks/use-session";
import { UserRound } from "lucide-react";

export default function Header() {
    const { data: usuario, isLoading } =
        useSession();

    return (
        <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-8">
            <div>
                <h2 className="text-xl font-semibold text-slate-100">
                    Painel Operacional
                </h2>

                <p className="text-sm text-slate-500">
                    Sistema Integrado de Gestão Portuária
                </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <UserRound className="h-5 w-5" />
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-100">
                        {isLoading
                            ? "Carregando..."
                            : usuario?.nome}
                    </p>

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        {usuario?.nivel}
                    </p>
                </div>
            </div>
        </header>
    );
}
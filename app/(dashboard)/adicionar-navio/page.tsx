"use client";

import { useRouter } from "next/navigation";
import NavioForm from "@/components/navios/navio-form";

export default function AdicionarNavioPage() {
  const router = useRouter();

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Adicionar Navio
          </h1>

          <p className="mt-2 text-slate-400">
            Homologue uma nova entrada portuária.
          </p>
        </div>

        <NavioForm
          onSuccess={() => router.push("/estoque")}
        />
      </section>

      <aside className="h-fit rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold">
          Tabela tarifária
        </h2>

        <ul className="mt-4 space-y-3 text-sm text-slate-400">
          <li>
            <strong className="text-slate-200">
              Tarifa base:
            </strong>{" "}
            R$ 500,00.
          </li>

          <li>
            <strong className="text-slate-200">
              Carga perecível:
            </strong>{" "}
            adicional de 15%.
          </li>

          <li>
            <strong className="text-slate-200">
              Peso acima de 50 toneladas:
            </strong>{" "}
            adicional de 10%.
          </li>

          <li>
            <strong className="text-slate-200">
              Classe Alpha:
            </strong>{" "}
            desconto de 5%.
          </li>

          <li>
            <strong className="text-slate-200">
              Limite máximo:
            </strong>{" "}
            100.000 kg.
          </li>
        </ul>
      </aside>
    </div>
  );
}
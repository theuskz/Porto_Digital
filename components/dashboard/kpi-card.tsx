interface Props {
  titulo: string;
  valor: string;
}

export default function KpiCard({
  titulo,
  valor,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <p className="text-sm text-slate-400">

        {titulo}

      </p>

      <h2 className="mt-3 text-3xl font-bold">

        {valor}

      </h2>

    </div>
  );
}
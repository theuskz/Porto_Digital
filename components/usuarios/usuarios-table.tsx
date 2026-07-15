"use client";

import {
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Usuario } from "@/types/usuarios";

interface Props {
  usuarios: Usuario[];
}

export default function UsuariosTable({
  usuarios,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="w-full">
        <thead className="bg-slate-900">
          <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
            <th className="px-5 py-4">
              Funcionário
            </th>

            <th className="px-5 py-4">
              Login
            </th>

            <th className="px-5 py-4">
              Privilégio
            </th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr
              key={usuario.id}
              className="border-t border-slate-800 transition hover:bg-slate-900/60"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-medium text-slate-100">
                      {usuario.nome}
                    </p>

                    <p className="text-xs text-slate-500">
                      ID #{usuario.id}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 text-sm text-slate-300">
                @{usuario.usuario}
              </td>

              <td className="px-5 py-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {usuario.nivel}
                </span>
              </td>
            </tr>
          ))}

          {usuarios.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="p-10 text-center text-slate-500"
              >
                Nenhum usuário cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
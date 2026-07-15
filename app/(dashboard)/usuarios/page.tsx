"use client";

import {
  ShieldCheck,
  Users,
} from "lucide-react";

import UsuarioForm from "@/components/usuarios/usuarios-form";
import UsuariosTable from "@/components/usuarios/usuarios-table";
import { useUsuarios } from "@/hooks/use-usuarios";

export default function UsuariosPage() {
  const {
    data: usuarios = [],
    isLoading,
    isError,
    error,
  } = useUsuarios();

  if (isLoading) {
    return (
      <p className="text-slate-400">
        Carregando usuários...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        {error instanceof Error
          ? error.message
          : "Erro ao carregar usuários."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Users className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Gerenciar Usuários
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Cadastre operadores e controle os níveis de acesso.
          </p>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.25fr]">
        <section className="h-fit rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-400" />

            <h2 className="text-lg font-semibold">
              Nova credencial
            </h2>
          </div>

          <UsuarioForm />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Operadores habilitados
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {usuarios.length} usuário(s) cadastrado(s)
            </p>
          </div>

          <UsuariosTable usuarios={usuarios} />
        </section>
      </div>
    </div>
  );
}
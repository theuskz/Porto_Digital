"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Anchor, LockKeyhole, UserRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          senha,
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(
          resultado.error || "Não foi possível realizar o login."
        );
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro inesperado ao realizar o login."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b14] px-4 text-white">
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <section className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <Anchor className="h-8 w-8" />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            Porto Digital
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sistema Integrado de Gestão Portuária
          </p>
        </div>

        <form onSubmit={entrar} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="usuario"
              className="text-sm font-medium text-slate-200"
            >
              Usuário
            </label>

            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
                placeholder="Digite seu usuário"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="senha"
              className="text-sm font-medium text-slate-200"
            >
              Senha
            </label>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {erro && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar no sistema"}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-800 pt-5 text-center">
          <p className="text-xs text-slate-500">
            Acesso restrito aos operadores autorizados
          </p>
        </div>
      </section>
    </main>
  );
}
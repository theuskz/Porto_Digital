"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  usuarioSchema,
  UsuarioFormData,
} from "@/lib/validations/usuario";
import { useCreateUsuario } from "@/hooks/mutations/use-create-usuario";

export default function UsuarioForm() {
  const mutation = useCreateUsuario();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),

    defaultValues: {
      nome: "",
      usuario: "",
      senha: "",
      nivel: "Auditor",
    },
  });

  function onSubmit(data: UsuarioFormData) {
    mutation.mutate(data, {
      onSuccess() {
        reset();
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label
          htmlFor="nome"
          className="text-sm font-medium"
        >
          Nome completo
        </label>

        <input
          id="nome"
          placeholder="Ex: Ana Maria Silva"
          {...register("nome")}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-blue-500"
        />

        {errors.nome && (
          <p className="text-sm text-red-400">
            {errors.nome.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="usuario"
            className="text-sm font-medium"
          >
            Login
          </label>

          <input
            id="usuario"
            placeholder="Ex: ana.silva"
            {...register("usuario")}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.usuario && (
            <p className="text-sm text-red-400">
              {errors.usuario.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="senha"
            className="text-sm font-medium"
          >
            Senha
          </label>

          <input
            id="senha"
            type="password"
            placeholder="Digite uma senha"
            {...register("senha")}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.senha && (
            <p className="text-sm text-red-400">
              {errors.senha.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="nivel"
          className="text-sm font-medium"
        >
          Nível de acesso
        </label>

        <select
          id="nivel"
          {...register("nivel")}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-blue-500"
        >
          <option value="Auditor">
            Auditor
          </option>

          <option value="Supervisor">
            Supervisor
          </option>

          <option value="Master">
            Master
          </option>
        </select>

        {errors.nivel && (
          <p className="text-sm text-red-400">
            {errors.nivel.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {mutation.isPending
          ? "Cadastrando..."
          : "Registrar credencial"}
      </button>
    </form>
  );
}
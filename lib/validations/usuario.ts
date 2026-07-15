import { z } from "zod";

export const usuarioSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "Informe o nome completo."),

  usuario: z
    .string()
    .trim()
    .min(3, "O login precisa ter pelo menos 3 caracteres.")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Use apenas letras, números, ponto, hífen ou underline."
    ),

  senha: z
    .string()
    .min(4, "A senha precisa ter pelo menos 4 caracteres."),

  nivel: z.enum(["Auditor", "Supervisor", "Master"]),
});

export type UsuarioFormData = z.infer<
  typeof usuarioSchema
>;
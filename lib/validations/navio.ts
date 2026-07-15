import { z } from "zod";

export const navioSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, "Informe um nome com pelo menos 3 caracteres."),

    eh_perecivel: z.boolean(),

    containers: z
        .number({
            message: "Informe a quantidade de containers.",
        })
        .int("A quantidade deve ser um número inteiro.")
        .min(1, "A quantidade mínima é 1."),

    peso: z
        .number({
            message: "Informe o peso da carga.",
        })
        .positive("O peso deve ser maior que zero.")
        .max(100000, "O peso máximo permitido é 100.000 kg."),
});

export type NavioFormData = z.infer<typeof navioSchema>;
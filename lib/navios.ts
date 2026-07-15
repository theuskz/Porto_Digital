import { prisma } from "./prisma";
import {
  calcularTaxas,
  CargaCriticaError,
} from "./taxas";

export async function criarNavio(data: {
  nome: string;
  eh_perecivel: boolean;
  containers: number;
  peso: number;
}) {
  if (data.peso > 100000) {
    throw new CargaCriticaError(
      "Peso acima do limite permitido de 100.000 kg."
    );
  }

  return prisma.navio.create({
    data: {
      nome: data.nome.trim(),
      eh_perecivel: data.eh_perecivel,
      containers: data.containers,
      peso: data.peso,
      valor_total: calcularTaxas(
        data.nome,
        data.eh_perecivel,
        data.peso
      ),
    },
  });
}
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
      "Peso acima do permitido."
    );
  }

  return prisma.navio.create({
    data: {
      ...data,
      valor_total: calcularTaxas(
        data.nome,
        data.eh_perecivel,
        data.peso
      ),
    },
  });
}
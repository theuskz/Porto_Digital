export class CargaCriticaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CargaCriticaError";
  }
}

export function calcularTaxas(
  nome: string,
  perecivel: boolean,
  peso: number
) {
  const despacho = 500;

  const taxaPerecivel = perecivel ? despacho * 0.15 : 0;

  const taxaPeso = peso > 50000 ? despacho * 0.1 : 0;

  const desconto =
    nome.toUpperCase().startsWith("ALPHA")
      ? despacho * 0.05
      : 0;

  return despacho + taxaPerecivel + taxaPeso - desconto;
}
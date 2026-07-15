export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  nivel: "Auditor" | "Supervisor" | "Master";
}
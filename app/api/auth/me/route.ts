import { NextRequest, NextResponse } from "next/server";
import { verificarToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(
    "porto_session"
  )?.value;

  if (!token) {
    return NextResponse.json(
      {
        error: "Usuário não autenticado.",
      },
      {
        status: 401,
      }
    );
  }

  const sessao = await verificarToken(token);

  if (!sessao) {
    return NextResponse.json(
      {
        error: "Sessão inválida ou expirada.",
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({
    id: sessao.id,
    nome: sessao.nome,
    usuario: sessao.usuario,
    nivel: sessao.nivel,
  });
}
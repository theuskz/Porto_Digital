import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { verificarToken } from "@/lib/auth";
import { usuarioSchema } from "@/lib/validations/usuario";

async function verificarMaster(request: NextRequest) {
  const token = request.cookies.get(
    "porto_session"
  )?.value;

  if (!token) {
    return null;
  }

  const sessao = await verificarToken(token);

  if (
    !sessao ||
    sessao.nivel.toLowerCase() !== "master"
  ) {
    return null;
  }

  return sessao;
}

export async function GET(request: NextRequest) {
  const sessao = await verificarMaster(request);

  if (!sessao) {
    return NextResponse.json(
      {
        error: "Acesso permitido apenas para usuários Master.",
      },
      {
        status: 403,
      }
    );
  }

  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        usuario: true,
        nivel: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar usuários.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  const sessao = await verificarMaster(request);

  if (!sessao) {
    return NextResponse.json(
      {
        error: "Acesso permitido apenas para usuários Master.",
      },
      {
        status: 403,
      }
    );
  }

  try {
    const body = await request.json();

    const dados = usuarioSchema.parse({
      ...body,
      usuario: String(body.usuario ?? "")
        .trim()
        .toLowerCase(),
    });

    const usuarioExistente =
      await prisma.usuario.findUnique({
        where: {
          usuario: dados.usuario,
        },
      });

    if (usuarioExistente) {
      return NextResponse.json(
        {
          error: "Esse login já está em uso.",
        },
        {
          status: 409,
        }
      );
    }

    const senhaHash = await bcrypt.hash(
      dados.senha,
      10
    );

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: dados.nome,
        usuario: dados.usuario,
        senha: senhaHash,
        nivel: dados.nivel,
      },

      select: {
        id: true,
        nome: true,
        usuario: true,
        nivel: true,
      },
    });

    return NextResponse.json(novoUsuario, {
      status: 201,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao cadastrar usuário.",
      },
      {
        status: 400,
      }
    );
  }
}
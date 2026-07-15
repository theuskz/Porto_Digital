import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { criarNavio } from "@/lib/navios";

export async function GET() {
  try {
    const navios = await prisma.navio.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(navios);
  } catch (error) {
    console.error("Erro ao buscar navios:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar navios.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const navio = await criarNavio(body);

    return NextResponse.json(navio, {
      status: 201,
    });
  } catch (error) {
    const mensagem =
      error instanceof Error
        ? error.message
        : "Erro ao cadastrar navio.";

    return NextResponse.json(
      { error: mensagem },
      { status: 400 }
    );
  }
}
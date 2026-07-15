import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calcularTaxas } from "@/lib/taxas";
import { navioSchema } from "@/lib/validations/navio";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const navioId = Number(id);

    if (!Number.isInteger(navioId)) {
      return NextResponse.json(
        { error: "ID inválido." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const dados = navioSchema.parse(body);

    const navioExiste = await prisma.navio.findUnique({
      where: {
        id: navioId,
      },
    });

    if (!navioExiste) {
      return NextResponse.json(
        { error: "Navio não encontrado." },
        { status: 404 }
      );
    }

    const navioAtualizado = await prisma.navio.update({
      where: {
        id: navioId,
      },
      data: {
        nome: dados.nome.trim(),
        eh_perecivel: dados.eh_perecivel ? 1 : 0,
        containers: dados.containers,
        peso: dados.peso,
        valor_total: calcularTaxas(
          dados.nome,
          dados.eh_perecivel,
          dados.peso
        ),
      },
    });

    return NextResponse.json({
      ...navioAtualizado,
      eh_perecivel: Boolean(
        navioAtualizado.eh_perecivel
      ),
    });
  } catch (error) {
    console.error(
      "Erro ao atualizar navio:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar navio.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const navioId = Number(id);

    if (!Number.isInteger(navioId)) {
      return NextResponse.json(
        { error: "ID inválido." },
        { status: 400 }
      );
    }

    const navioExiste = await prisma.navio.findUnique({
      where: {
        id: navioId,
      },
    });

    if (!navioExiste) {
      return NextResponse.json(
        { error: "Navio não encontrado." },
        { status: 404 }
      );
    }

    await prisma.navio.delete({
      where: {
        id: navioId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Navio excluído com sucesso.",
    });
  } catch (error) {
    console.error(
      "Erro ao excluir navio:",
      error
    );

    return NextResponse.json(
      { error: "Erro ao excluir navio." },
      { status: 500 }
    );
  }
}
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const navios = await prisma.navio.findMany();

    const pereciveis =
        navios.filter(n => n.eh_perecivel);

    const comuns =
        navios.filter(n => !n.eh_perecivel);

    const faturamento =
        navios.reduce(
            (acc, n) => acc + n.valor_total,
            0
        );

    const peso =
        navios.reduce(
            (acc, n) => acc + n.peso,
            0
        );

    return NextResponse.json({

        totalNavios:
            navios.length,

        faturamento,

        peso,

        pereciveis:
            pereciveis.length,

        comuns:
            comuns.length

    });

}
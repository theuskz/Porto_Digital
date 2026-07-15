import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { criarToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const usuarioInformado = String(body.usuario ?? "")
            .trim()
            .toLowerCase();

        const senhaInformada = String(body.senha ?? "");

        if (!usuarioInformado || !senhaInformada) {
            return NextResponse.json(
                { error: "Informe usuário e senha." },
                { status: 400 }
            );
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                usuario: usuarioInformado,
            },
        });

        if (!usuario) {
            return NextResponse.json(
                { error: "Usuário ou senha inválidos." },
                { status: 401 }
            );
        }

        const senhaValida = usuario.senha.startsWith("$2")
            ? await bcrypt.compare(senhaInformada, usuario.senha)
            : senhaInformada === usuario.senha;

        if (!senhaValida) {
            return NextResponse.json(
                { error: "Usuário ou senha inválidos." },
                { status: 401 }
            );
        }

        const token = await criarToken({
            id: usuario.id,
            nome: usuario.nome,
            usuario: usuario.usuario,
            nivel: usuario.nivel,
        });

        const response = NextResponse.json({
            success: true,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                usuario: usuario.usuario,
                nivel: usuario.nivel,
            },
        });

        response.cookies.set("porto_session", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 8,
        });

        return response;
    } catch (error) {
        console.error("ERRO NO LOGIN:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Erro interno ao realizar login.",
            },
            { status: 500 }
        );
    }
}
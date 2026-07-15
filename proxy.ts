import { NextRequest, NextResponse } from "next/server";
import { verificarToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const token = request.cookies.get("porto_session")?.value;

    const sessao = token
        ? await verificarToken(token)
        : null;

    if (!sessao) {
        const response = NextResponse.redirect(
            new URL("/login", request.url)
        );

        response.cookies.set("porto_session", "", {
            expires: new Date(0),
            path: "/",
        });

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/estoque/:path*",
        "/adicionar-navio/:path*",
        "/auditoria/:path*",
        "/usuarios/:path*",
    ],
};
import {
    SignJWT,
    jwtVerify,
    type JWTPayload,
} from "jose";

const segredo = new TextEncoder().encode(
    process.env.JWT_SECRET ||
    "porto-digital-segredo-dev"
);

export interface SessaoUsuario
    extends JWTPayload {
    id: number;
    nome: string;
    usuario: string;
    nivel: string;
}

export async function criarToken(
    usuario: SessaoUsuario
) {
    return new SignJWT(usuario)
        .setProtectedHeader({
            alg: "HS256",
        })
        .setIssuedAt()
        .setExpirationTime("8h")
        .sign(segredo);
}

export async function verificarToken(
    token: string
): Promise<SessaoUsuario | null> {
    try {
        const { payload } =
            await jwtVerify<SessaoUsuario>(
                token,
                segredo
            );

        return {
            id: Number(payload.id),
            nome: String(payload.nome),
            usuario: String(payload.usuario),
            nivel: String(payload.nivel),
        };
    } catch {
        return null;
    }
}
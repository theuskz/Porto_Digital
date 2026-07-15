import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usuarios = await prisma.usuario.findMany();

  let atualizados = 0;

  for (const usuario of usuarios) {
    const senhaJaPossuiHash =
      usuario.senha.startsWith("$2a$") ||
      usuario.senha.startsWith("$2b$") ||
      usuario.senha.startsWith("$2y$");

    if (senhaJaPossuiHash) {
      console.log(
        `Usuário ${usuario.usuario}: senha já protegida.`
      );

      continue;
    }

    const senhaHash = await bcrypt.hash(
      usuario.senha,
      12
    );

    await prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: {
        senha: senhaHash,
      },
    });

    atualizados++;

    console.log(
      `Usuário ${usuario.usuario}: senha convertida para hash.`
    );
  }

  console.log(
    `Migração concluída. ${atualizados} senha(s) atualizada(s).`
  );
}

main()
  .catch((error) => {
    console.error(
      "Erro ao converter senhas:",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
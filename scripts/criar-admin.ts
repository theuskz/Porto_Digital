import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10);

  const usuario = await prisma.usuario.upsert({
    where: {
      usuario: "admin",
    },
    update: {},
    create: {
      nome: "Administrador",
      usuario: "admin",
      senha: senhaHash,
      nivel: "Master",
    },
  });

  console.log("Administrador criado com sucesso!");
  console.log(usuario);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
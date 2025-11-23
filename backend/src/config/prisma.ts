import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Avoid multiple instances in development mode
declare global {
  // es-lint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = prisma;
}

export default globalThis.prismaGlobal;

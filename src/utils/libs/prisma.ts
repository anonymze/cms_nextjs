// ref: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

import { ENV_SERVER } from "@/env/server";
import { PrismaClient } from "@prisma/client";

export const getSelectObject = (fields: string[]) => {
  const selectObject: Record<string, boolean> = { id: false };
  fields.forEach(field => {
    selectObject[field] = true;
  });
  return selectObject;
}

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (ENV_SERVER.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

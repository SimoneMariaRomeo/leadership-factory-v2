// This file keeps one Prisma client alive so the database connection stays steady.
import { PrismaClient } from "../../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPool?: Pool;
  prismaAdapter?: PrismaPg;
};

const prismaPool = globalForPrisma.prismaPool ?? new Pool({ connectionString: process.env.DATABASE_URL });
const prismaAdapter = globalForPrisma.prismaAdapter ?? new PrismaPg(prismaPool);
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: prismaAdapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = prismaPool;
  globalForPrisma.prismaAdapter = prismaAdapter;
}

export { prisma };

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Reuse one client across hot reloads in dev, so we don't open new connections each time
const globalForPrisma = globalThis;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

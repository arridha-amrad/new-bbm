import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected");
  } catch (err) {
    console.log("Failed to connect to DB");
    process.exit(1);
  }
};

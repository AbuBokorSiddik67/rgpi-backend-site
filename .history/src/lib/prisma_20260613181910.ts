import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import logger from "../utils/logger";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export let dbConnectionStatus = "Disconnected";

export async function checkDbConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnectionStatus = "Connected";
    logger.info("[DB Connection]: Successfully connected to the database.");
  } catch (error) {
    dbConnectionStatus = "Disconnected";
    logger.error(
      `[DB Connection Error]: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

// প্রতি ৫ মিনিট পর পর অটো-চেক ব্যাকগ্রাউন্ডে চলবে
setInterval(checkDbConnection, 5 * 60 * 1000);

export { prisma };

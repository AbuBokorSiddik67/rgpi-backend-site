// import { PrismaClient } from '@prisma/client/index.js';

// Some module systems expose PrismaClient as a CommonJS default export.
// Import the module and extract PrismaClient to avoid "no exported member" errors.
import prismaPkg from "@prisma/client";

const { PrismaClient } = prismaPkg as any;

const prisma = new PrismaClient();

export default prisma;
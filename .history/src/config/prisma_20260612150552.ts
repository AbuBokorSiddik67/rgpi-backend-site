import pkg from '@prisma/client';
const { PrismaClien } = pkg;

const prisma = new PrismaClient();

export default prisma;
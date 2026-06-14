import pkg from '@prisma/client';
import { PrismaClient } from '../../node_modules/prisma/build/index';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default prisma;
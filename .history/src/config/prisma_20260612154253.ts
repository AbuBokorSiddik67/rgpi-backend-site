// প্রিজমার নতুন জেনারেটেড লোকেশন থেকে সরাসরি ইম্পোর্ট
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

export default prisma;
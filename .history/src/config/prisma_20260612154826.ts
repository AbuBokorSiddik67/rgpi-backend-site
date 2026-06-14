// প্রিজমার নতুন জেনারেটেড লোকেশন থেকে সরাসরি ইম্পোর্ট
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export default prisma;
import { prisma } from "../../lib/prisma.js";
import type { CreateClassSessionInput, UpdateClassSessionInput } from "./class-session.interface.js";

export const classSessionService = {
  async create(input: CreateClassSessionInput) {
    const classSession = await prisma.classSession.create({ data: input });
    return classSession;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.classSession.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.classSession.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const classSession = await prisma.classSession.findUnique({ where: { id } });
    if (!classSession) {
      throw Object.assign(new Error("ClassSession not found"), { status: 404 });
    }
    return classSession;
  },

  async update(id: string, input: UpdateClassSessionInput) {
    await classSessionService.findById(id);
    const updated = await prisma.classSession.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await classSessionService.findById(id);
    const classSession = await prisma.classSession.delete({ where: { id } });
    return classSession;
  },
};

import { prisma } from "../../lib/prisma.js";
import type { CreateSubjectInput, UpdateSubjectInput } from "./subject.interface.js";

export const subjectService = {
  async create(input: CreateSubjectInput) {
    const subject = await prisma.subject.create({ data: input });
    return subject;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.subject.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.subject.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const subject = await prisma.subject.findUnique({ where: { id } });
    if (!subject) {
      throw Object.assign(new Error("Subject not found"), { status: 404 });
    }
    return subject;
  },

  async update(id: string, input: UpdateSubjectInput) {
    await subjectService.findById(id);
    const updated = await prisma.subject.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await subjectService.findById(id);
    // soft delete: keep the row, just deactivate it
    const subject = await prisma.subject.update({ where: { id }, data: { isActive: false } });
    return subject;
  },
};

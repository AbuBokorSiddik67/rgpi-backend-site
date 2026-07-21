import { prisma } from "../../lib/prisma.js";
import type { CreateSemesterInput, UpdateSemesterInput } from "./semester.interface.js";

export const semesterService = {
  async create(input: CreateSemesterInput) {
    const semester = await prisma.semester.create({ data: input });
    return semester;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.semester.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.semester.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const semester = await prisma.semester.findUnique({ where: { id } });
    if (!semester) {
      throw Object.assign(new Error("Semester not found"), { status: 404 });
    }
    return semester;
  },

  async update(id: string, input: UpdateSemesterInput) {
    await semesterService.findById(id);
    const updated = await prisma.semester.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await semesterService.findById(id);
    // soft delete: keep the row, just deactivate it
    const semester = await prisma.semester.update({ where: { id }, data: { isActive: false } });
    return semester;
  },
};

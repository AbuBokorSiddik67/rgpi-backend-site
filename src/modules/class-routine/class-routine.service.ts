import { prisma } from "../../lib/prisma.js";
import type { CreateClassRoutineInput, UpdateClassRoutineInput } from "./class-routine.interface.js";

export const classRoutineService = {
  async create(input: CreateClassRoutineInput) {
    const classRoutine = await prisma.classRoutine.create({ data: input });
    return classRoutine;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.classRoutine.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.classRoutine.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const classRoutine = await prisma.classRoutine.findUnique({ where: { id } });
    if (!classRoutine) {
      throw Object.assign(new Error("ClassRoutine not found"), { status: 404 });
    }
    return classRoutine;
  },

  async update(id: string, input: UpdateClassRoutineInput) {
    await classRoutineService.findById(id);
    const updated = await prisma.classRoutine.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await classRoutineService.findById(id);
    // soft delete: keep the row, just deactivate it
    const classRoutine = await prisma.classRoutine.update({ where: { id }, data: { isActive: false } });
    return classRoutine;
  },
};

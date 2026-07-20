import { prisma } from "../../lib/prisma.js";
import type { CreateInstituteInput, UpdateInstituteInput } from "./institute.interface.js";

export const instituteService = {
  async create(input: CreateInstituteInput) {
    const institute = await prisma.institute.create({ data: input });
    return institute;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.institute.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.institute.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const institute = await prisma.institute.findUnique({ where: { id } });
    if (!institute) {
      throw Object.assign(new Error("Institute not found"), { status: 404 });
    }
    return institute;
  },

  async update(id: string, input: UpdateInstituteInput) {
    await instituteService.findById(id);
    const updated = await prisma.institute.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await instituteService.findById(id);
    // soft delete: keep the row, just deactivate it
    const institute = await prisma.institute.update({ where: { id }, data: { isActive: false } });
    return institute;
  },
};

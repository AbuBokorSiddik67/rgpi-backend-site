import { prisma } from "../../lib/prisma.js";
import type { CreatePeriodInput, UpdatePeriodInput } from "./period.interface.js";

export const periodService = {
  async create(input: CreatePeriodInput) {
    const period = await prisma.period.create({ data: input });
    return period;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.period.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.period.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const period = await prisma.period.findUnique({ where: { id } });
    if (!period) {
      throw Object.assign(new Error("Period not found"), { status: 404 });
    }
    return period;
  },

  async update(id: string, input: UpdatePeriodInput) {
    await periodService.findById(id);
    const updated = await prisma.period.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await periodService.findById(id);
    // soft delete: keep the row, just deactivate it
    const period = await prisma.period.update({ where: { id }, data: { isActive: false } });
    return period;
  },
};

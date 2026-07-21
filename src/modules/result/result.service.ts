import { prisma } from "../../lib/prisma.js";
import type { CreateResultInput, UpdateResultInput } from "./result.interface.js";

export const resultService = {
  async create(input: CreateResultInput) {
    const result = await prisma.result.create({ data: input });
    return result;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.result.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.result.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const result = await prisma.result.findUnique({ where: { id } });
    if (!result) {
      throw Object.assign(new Error("Result not found"), { status: 404 });
    }
    return result;
  },

  async update(id: string, input: UpdateResultInput) {
    await resultService.findById(id);
    const updated = await prisma.result.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await resultService.findById(id);
    const result = await prisma.result.delete({ where: { id } });
    return result;
  },
};

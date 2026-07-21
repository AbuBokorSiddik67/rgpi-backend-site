import { prisma } from "../../lib/prisma.js";
import type { CreateFeeInput, UpdateFeeInput } from "./fee.interface.js";

export const feeService = {
  async create(input: CreateFeeInput) {
    const fee = await prisma.fee.create({ data: input });
    return fee;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.fee.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.fee.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const fee = await prisma.fee.findUnique({ where: { id } });
    if (!fee) {
      throw Object.assign(new Error("Fee not found"), { status: 404 });
    }
    return fee;
  },

  async update(id: string, input: UpdateFeeInput) {
    await feeService.findById(id);
    const updated = await prisma.fee.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await feeService.findById(id);
    const fee = await prisma.fee.delete({ where: { id } });
    return fee;
  },
};

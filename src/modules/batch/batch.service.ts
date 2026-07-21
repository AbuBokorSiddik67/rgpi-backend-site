import { prisma } from "../../lib/prisma.js";
import type { CreateBatchInput, UpdateBatchInput } from "./batch.interface.js";

export const batchService = {
  async create(input: CreateBatchInput) {
    const batch = await prisma.batch.create({ data: input });
    return batch;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.batch.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.batch.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const batch = await prisma.batch.findUnique({ where: { id } });
    if (!batch) {
      throw Object.assign(new Error("Batch not found"), { status: 404 });
    }
    return batch;
  },

  async update(id: string, input: UpdateBatchInput) {
    await batchService.findById(id);
    const updated = await prisma.batch.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await batchService.findById(id);
    // soft delete: keep the row, just deactivate it
    const batch = await prisma.batch.update({ where: { id }, data: { isActive: false } });
    return batch;
  },
};

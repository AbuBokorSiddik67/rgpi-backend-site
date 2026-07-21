import { prisma } from "../../lib/prisma.js";
import type { CreateShiftInput, UpdateShiftInput } from "./shift.interface.js";

export const shiftService = {
  async create(input: CreateShiftInput) {
    const shift = await prisma.shift.create({ data: input });
    return shift;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.shift.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.shift.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const shift = await prisma.shift.findUnique({ where: { id } });
    if (!shift) {
      throw Object.assign(new Error("Shift not found"), { status: 404 });
    }
    return shift;
  },

  async update(id: string, input: UpdateShiftInput) {
    await shiftService.findById(id);
    const updated = await prisma.shift.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await shiftService.findById(id);
    // soft delete: keep the row, just deactivate it
    const shift = await prisma.shift.update({ where: { id }, data: { isActive: false } });
    return shift;
  },
};

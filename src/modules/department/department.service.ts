import { prisma } from "../../lib/prisma.js";
import type { CreateDepartmentInput, UpdateDepartmentInput } from "./department.interface.js";

export const departmentService = {
  async create(input: CreateDepartmentInput) {
    const department = await prisma.department.create({ data: input });
    return department;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.department.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.department.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const department = await prisma.department.findUnique({ where: { id } });
    if (!department) {
      throw Object.assign(new Error("Department not found"), { status: 404 });
    }
    return department;
  },

  async update(id: string, input: UpdateDepartmentInput) {
    await departmentService.findById(id);
    const updated = await prisma.department.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await departmentService.findById(id);
    // soft delete: keep the row, just deactivate it
    const department = await prisma.department.update({ where: { id }, data: { isActive: false } });
    return department;
  },
};

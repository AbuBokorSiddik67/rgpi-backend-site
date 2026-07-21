import { prisma } from "../../lib/prisma.js";
import type { CreateInstructorProfileInput, UpdateInstructorProfileInput } from "./instructor-profile.interface.js";

export const instructorProfileService = {
  async create(input: CreateInstructorProfileInput) {
    const instructorProfile = await prisma.instructorProfile.create({ data: input });
    return instructorProfile;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.instructorProfile.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.instructorProfile.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const instructorProfile = await prisma.instructorProfile.findUnique({ where: { id } });
    if (!instructorProfile) {
      throw Object.assign(new Error("InstructorProfile not found"), { status: 404 });
    }
    return instructorProfile;
  },

  async update(id: string, input: UpdateInstructorProfileInput) {
    await instructorProfileService.findById(id);
    const updated = await prisma.instructorProfile.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await instructorProfileService.findById(id);
    // soft delete: keep the row, just deactivate it
    const instructorProfile = await prisma.instructorProfile.update({ where: { id }, data: { isActive: false } });
    return instructorProfile;
  },
};

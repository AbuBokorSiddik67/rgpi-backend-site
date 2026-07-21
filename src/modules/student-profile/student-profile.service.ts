import { prisma } from "../../lib/prisma.js";
import type { CreateStudentProfileInput, UpdateStudentProfileInput } from "./student-profile.interface.js";

export const studentProfileService = {
  async create(input: CreateStudentProfileInput) {
    const studentProfile = await prisma.studentProfile.create({ data: input });
    return studentProfile;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.studentProfile.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.studentProfile.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const studentProfile = await prisma.studentProfile.findUnique({ where: { id } });
    if (!studentProfile) {
      throw Object.assign(new Error("StudentProfile not found"), { status: 404 });
    }
    return studentProfile;
  },

  async update(id: string, input: UpdateStudentProfileInput) {
    await studentProfileService.findById(id);
    const updated = await prisma.studentProfile.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await studentProfileService.findById(id);
    // soft delete: keep the row, just deactivate it
    const studentProfile = await prisma.studentProfile.update({ where: { id }, data: { isActive: false } });
    return studentProfile;
  },
};

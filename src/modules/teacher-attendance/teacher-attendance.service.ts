import { prisma } from "../../lib/prisma.js";
import type { CreateTeacherAttendanceInput, UpdateTeacherAttendanceInput } from "./teacher-attendance.interface.js";

export const teacherAttendanceService = {
  async create(input: CreateTeacherAttendanceInput) {
    const teacherAttendance = await prisma.teacherAttendance.create({ data: input });
    return teacherAttendance;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.teacherAttendance.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.teacherAttendance.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const teacherAttendance = await prisma.teacherAttendance.findUnique({ where: { id } });
    if (!teacherAttendance) {
      throw Object.assign(new Error("TeacherAttendance not found"), { status: 404 });
    }
    return teacherAttendance;
  },

  async update(id: string, input: UpdateTeacherAttendanceInput) {
    await teacherAttendanceService.findById(id);
    const updated = await prisma.teacherAttendance.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await teacherAttendanceService.findById(id);
    const teacherAttendance = await prisma.teacherAttendance.delete({ where: { id } });
    return teacherAttendance;
  },
};

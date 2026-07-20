import { prisma } from "../../lib/prisma.js";
import type { CreateAttendanceInput, UpdateAttendanceInput } from "./attendance.interface.js";

export const attendanceService = {
  async create(input: CreateAttendanceInput) {
    const attendance = await prisma.attendance.create({ data: input });
    return attendance;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.attendance.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.attendance.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const attendance = await prisma.attendance.findUnique({ where: { id } });
    if (!attendance) {
      throw Object.assign(new Error("Attendance not found"), { status: 404 });
    }
    return attendance;
  },

  async update(id: string, input: UpdateAttendanceInput) {
    await attendanceService.findById(id);
    const updated = await prisma.attendance.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await attendanceService.findById(id);
    const attendance = await prisma.attendance.delete({ where: { id } });
    return attendance;
  },
};

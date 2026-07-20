import { prisma } from "../../lib/prisma.js";
import type { CreateClassRoomInput, UpdateClassRoomInput } from "./class-room.interface.js";

export const classRoomService = {
  async create(input: CreateClassRoomInput) {
    const classRoom = await prisma.classRoom.create({ data: input });
    return classRoom;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.classRoom.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.classRoom.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const classRoom = await prisma.classRoom.findUnique({ where: { id } });
    if (!classRoom) {
      throw Object.assign(new Error("ClassRoom not found"), { status: 404 });
    }
    return classRoom;
  },

  async update(id: string, input: UpdateClassRoomInput) {
    await classRoomService.findById(id);
    const updated = await prisma.classRoom.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await classRoomService.findById(id);
    // soft delete: keep the row, just deactivate it
    const classRoom = await prisma.classRoom.update({ where: { id }, data: { isActive: false } });
    return classRoom;
  },
};

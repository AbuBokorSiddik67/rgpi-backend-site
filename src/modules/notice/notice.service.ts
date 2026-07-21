import { prisma } from "../../lib/prisma.js";
import type { CreateNoticeInput, UpdateNoticeInput } from "./notice.interface.js";

export const noticeService = {
  async create(input: CreateNoticeInput) {
    const notice = await prisma.notice.create({ data: input });
    return notice;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.notice.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.notice.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const notice = await prisma.notice.findUnique({ where: { id } });
    if (!notice) {
      throw Object.assign(new Error("Notice not found"), { status: 404 });
    }
    return notice;
  },

  async update(id: string, input: UpdateNoticeInput) {
    await noticeService.findById(id);
    const updated = await prisma.notice.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await noticeService.findById(id);
    // soft delete: keep the row, just deactivate it
    const notice = await prisma.notice.update({ where: { id }, data: { isActive: false } });
    return notice;
  },
};

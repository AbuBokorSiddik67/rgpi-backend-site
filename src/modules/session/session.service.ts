import { prisma } from "../../lib/prisma.js";
import type { CreateSessionInput, UpdateSessionInput } from "./session.interface.js";

export const sessionService = {
  async create(input: CreateSessionInput) {
    const session = await prisma.session.create({ data: input });
    return session;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.session.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.session.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const session = await prisma.session.findUnique({ where: { id } });
    if (!session) {
      throw Object.assign(new Error("Session not found"), { status: 404 });
    }
    return session;
  },

  async update(id: string, input: UpdateSessionInput) {
    await sessionService.findById(id);
    const updated = await prisma.session.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await sessionService.findById(id);
    // soft delete: keep the row, just deactivate it
    const session = await prisma.session.update({ where: { id }, data: { isActive: false } });
    return session;
  },
};

import { prisma } from "../../lib/prisma.js";
import type { CreatePrincipalProfileInput, UpdatePrincipalProfileInput } from "./principal-profile.interface.js";

export const principalProfileService = {
  async create(input: CreatePrincipalProfileInput) {
    const principalProfile = await prisma.principalProfile.create({ data: input });
    return principalProfile;
  },

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.principalProfile.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.principalProfile.count(),
    ]);
    return { items, total, page, limit };
  },

  async findById(id: string) {
    const principalProfile = await prisma.principalProfile.findUnique({ where: { id } });
    if (!principalProfile) {
      throw Object.assign(new Error("PrincipalProfile not found"), { status: 404 });
    }
    return principalProfile;
  },

  async update(id: string, input: UpdatePrincipalProfileInput) {
    await principalProfileService.findById(id);
    const updated = await prisma.principalProfile.update({ where: { id }, data: input });
    return updated;
  },

  async remove(id: string) {
    await principalProfileService.findById(id);
    const principalProfile = await prisma.principalProfile.delete({ where: { id } });
    return principalProfile;
  },
};

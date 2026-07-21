import { z } from "zod";

export const createDepartmentSchema = z.object({
  instituteId: z.string({ message: "instituteId is required" }),
  dptName: z.string({ message: "dptName is required" }),
});

export const updateDepartmentSchema = createDepartmentSchema.partial();

export type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentSchema = z.infer<typeof updateDepartmentSchema>;

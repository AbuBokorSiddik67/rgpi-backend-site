import { z } from "zod";

export const createClassSessionSchema = z.object({
  routineId: z.string({ message: "routineId is required" }),
  teacherId: z.string({ message: "teacherId is required" }),
  date: z.coerce.date(),
  status: z.enum(["HELD", "CANCELLED", "SUCCESSFULL"]).optional(),
});

export const updateClassSessionSchema = createClassSessionSchema.partial();

export type CreateClassSessionSchema = z.infer<typeof createClassSessionSchema>;
export type UpdateClassSessionSchema = z.infer<typeof updateClassSessionSchema>;

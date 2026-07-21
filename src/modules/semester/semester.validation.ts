import { z } from "zod";

export const createSemesterSchema = z.object({
  semesterNumber: z.number().int({ message: "semesterNumber must be an integer" }),
  classLoad: z.number().int({ message: "classLoad must be an integer" }).optional(),
  startDate: z.coerce.date().optional(),
});

export const updateSemesterSchema = createSemesterSchema.partial();

export type CreateSemesterSchema = z.infer<typeof createSemesterSchema>;
export type UpdateSemesterSchema = z.infer<typeof updateSemesterSchema>;

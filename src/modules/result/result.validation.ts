import { z } from "zod";

export const createResultSchema = z.object({
  studentId: z.string({ message: "studentId is required" }),
  subjectId: z.string({ message: "subjectId is required" }),
  semesterId: z.string({ message: "semesterId is required" }),
  contTheory: z.number({ message: "contTheory must be a number" }).optional(),
  finalTheory: z.number({ message: "finalTheory must be a number" }).optional(),
  contPractical: z.number({ message: "contPractical must be a number" }).optional(),
  finalPractical: z.number({ message: "finalPractical must be a number" }).optional(),
  totalMarks: z.number({ message: "totalMarks must be a number" }).optional(),
  grade: z.string({ message: "grade is required" }).optional(),
  gpa: z.number({ message: "gpa must be a number" }).optional(),
  isPublished: z.boolean().optional(),
});

export const updateResultSchema = createResultSchema.partial();

export type CreateResultSchema = z.infer<typeof createResultSchema>;
export type UpdateResultSchema = z.infer<typeof updateResultSchema>;

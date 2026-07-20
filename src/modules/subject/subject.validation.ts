import { z } from "zod";

export const createSubjectSchema = z.object({
  subjectName: z.string({ message: "subjectName is required" }),
  subjectCode: z.string({ message: "subjectCode is required" }),
  credit: z.number().int({ message: "credit must be an integer" }),
  theoryClass: z.number().int({ message: "theoryClass must be an integer" }),
  practicalClass: z.number().int({ message: "practicalClass must be an integer" }),
  contTheory: z.number().int({ message: "contTheory must be an integer" }).optional(),
  finalTheory: z.number().int({ message: "finalTheory must be an integer" }).optional(),
  contPractical: z.number().int({ message: "contPractical must be an integer" }).optional(),
  finalPractical: z.number().int({ message: "finalPractical must be an integer" }).optional(),
  grandTotal: z.number().int({ message: "grandTotal must be an integer" }),
  departmentId: z.string({ message: "departmentId is required" }),
  semesterId: z.string({ message: "semesterId is required" }),
});

export const updateSubjectSchema = createSubjectSchema.partial();

export type CreateSubjectSchema = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectSchema = z.infer<typeof updateSubjectSchema>;

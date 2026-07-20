import { z } from "zod";

export const createFeeSchema = z.object({
  studentId: z.string({ message: "studentId is required" }),
  amount: z.number({ message: "amount must be a number" }),
  status: z.enum(["PAID", "UNPAID", "PARTIAL"]).optional(),
  dueDate: z.coerce.date(),
  paidAt: z.coerce.date().optional(),
  remark: z.string({ message: "remark is required" }).optional(),
});

export const updateFeeSchema = createFeeSchema.partial();

export type CreateFeeSchema = z.infer<typeof createFeeSchema>;
export type UpdateFeeSchema = z.infer<typeof updateFeeSchema>;

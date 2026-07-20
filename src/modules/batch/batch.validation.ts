import { z } from "zod";

export const createBatchSchema = z.object({
  batchName: z.string({ message: "batchName is required" }),
  departmentId: z.string({ message: "departmentId is required" }),
  semesterId: z.string({ message: "semesterId is required" }),
  shiftId: z.string({ message: "shiftId is required" }),
  sessionId: z.string({ message: "sessionId is required" }),
});

export const updateBatchSchema = createBatchSchema.partial();

export type CreateBatchSchema = z.infer<typeof createBatchSchema>;
export type UpdateBatchSchema = z.infer<typeof updateBatchSchema>;

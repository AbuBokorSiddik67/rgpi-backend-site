import { z } from "zod";

export const createPeriodSchema = z.object({
  periodNumber: z.number().int({ message: "periodNumber must be an integer" }),
  startTime: z.string({ message: "startTime is required" }),
  endTime: z.string({ message: "endTime is required" }),
  shiftId: z.string({ message: "shiftId is required" }),
});

export const updatePeriodSchema = createPeriodSchema.partial();

export type CreatePeriodSchema = z.infer<typeof createPeriodSchema>;
export type UpdatePeriodSchema = z.infer<typeof updatePeriodSchema>;

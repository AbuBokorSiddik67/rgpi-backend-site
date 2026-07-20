import { z } from "zod";

export const createShiftSchema = z.object({
  shiftNumber: z.number().int({ message: "shiftNumber must be an integer" }),
});

export const updateShiftSchema = createShiftSchema.partial();

export type CreateShiftSchema = z.infer<typeof createShiftSchema>;
export type UpdateShiftSchema = z.infer<typeof updateShiftSchema>;

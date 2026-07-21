import { z } from "zod";

export const createSessionSchema = z.object({
  sessionYear: z.string({ message: "sessionYear is required" }),
});

export const updateSessionSchema = createSessionSchema.partial();

export type CreateSessionSchema = z.infer<typeof createSessionSchema>;
export type UpdateSessionSchema = z.infer<typeof updateSessionSchema>;

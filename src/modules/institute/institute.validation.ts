import { z } from "zod";

export const createInstituteSchema = z.object({
  name: z.string({ message: "name is required" }),
  address: z.string({ message: "address is required" }).optional(),
  logo: z.string({ message: "logo is required" }).optional(),
});

export const updateInstituteSchema = createInstituteSchema.partial();

export type CreateInstituteSchema = z.infer<typeof createInstituteSchema>;
export type UpdateInstituteSchema = z.infer<typeof updateInstituteSchema>;

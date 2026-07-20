import { z } from "zod";

export const createPrincipalProfileSchema = z.object({
  userId: z.string({ message: "userId is required" }),
  profilePicture: z.string({ message: "profilePicture is required" }).optional(),
  superAdminName: z.string({ message: "superAdminName is required" }),
  joiningDate: z.coerce.date().optional(),
  leavingDate: z.coerce.date().optional(),
  pastInstituteName: z.string({ message: "pastInstituteName is required" }).optional(),
});

export const updatePrincipalProfileSchema = createPrincipalProfileSchema.partial();

export type CreatePrincipalProfileSchema = z.infer<typeof createPrincipalProfileSchema>;
export type UpdatePrincipalProfileSchema = z.infer<typeof updatePrincipalProfileSchema>;

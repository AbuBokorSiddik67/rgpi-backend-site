import { z } from "zod";

export const createInstructorProfileSchema = z.object({
  userId: z.string({ message: "userId is required" }),
  profilePicture: z.string({ message: "profilePicture is required" }).optional(),
  adminName: z.string({ message: "adminName is required" }),
  acronym: z.string({ message: "acronym is required" }).optional(),
  fatherName: z.string({ message: "fatherName is required" }).optional(),
  motherName: z.string({ message: "motherName is required" }).optional(),
  address: z.string({ message: "address is required" }).optional(),
  joiningDate: z.coerce.date().optional(),
  leavingDate: z.coerce.date().optional(),
  position: z.string({ message: "position is required" }).optional(),
  departmentId: z.string({ message: "departmentId is required" }),
  isSuspended: z.boolean().optional(),
  isAlert: z.boolean().optional(),
});

export const updateInstructorProfileSchema = createInstructorProfileSchema.partial();

export type CreateInstructorProfileSchema = z.infer<typeof createInstructorProfileSchema>;
export type UpdateInstructorProfileSchema = z.infer<typeof updateInstructorProfileSchema>;

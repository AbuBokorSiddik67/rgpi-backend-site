import { z } from "zod";

export const createStudentProfileSchema = z.object({
  userId: z.string({ message: "userId is required" }),
  roll: z.string({ message: "roll is required" }),
  registration: z.string({ message: "registration is required" }).optional(),
  profilePicture: z.string({ message: "profilePicture is required" }).optional(),
  studentName: z.string({ message: "studentName is required" }),
  fatherName: z.string({ message: "fatherName is required" }).optional(),
  motherName: z.string({ message: "motherName is required" }).optional(),
  birthIdNo: z.string({ message: "birthIdNo is required" }).optional(),
  nidNo: z.string({ message: "nidNo is required" }).optional(),
  fatherNidNo: z.string({ message: "fatherNidNo is required" }).optional(),
  motherNidNo: z.string({ message: "motherNidNo is required" }).optional(),
  address: z.string({ message: "address is required" }).optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  batchId: z.string({ message: "batchId is required" }),
  isStripend: z.boolean().optional(),
  isSuspended: z.boolean().optional(),
  isAlert: z.boolean().optional(),
});

export const updateStudentProfileSchema = createStudentProfileSchema.partial();

export type CreateStudentProfileSchema = z.infer<typeof createStudentProfileSchema>;
export type UpdateStudentProfileSchema = z.infer<typeof updateStudentProfileSchema>;

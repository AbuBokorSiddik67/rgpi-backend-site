import { z } from "zod";

export const createAttendanceSchema = z.object({
  studentId: z.string({ message: "studentId is required" }),
  classSessionId: z.string({ message: "classSessionId is required" }),
  status: z.enum(["PRESENT", "ABSENT", "LATE"]).optional(),
  markedAt: z.coerce.date().optional(),
});

export const updateAttendanceSchema = createAttendanceSchema.partial();

export type CreateAttendanceSchema = z.infer<typeof createAttendanceSchema>;
export type UpdateAttendanceSchema = z.infer<typeof updateAttendanceSchema>;

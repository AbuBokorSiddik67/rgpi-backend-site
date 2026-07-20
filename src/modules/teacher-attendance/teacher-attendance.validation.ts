import { z } from "zod";

export const createTeacherAttendanceSchema = z.object({
  teacherId: z.string({ message: "teacherId is required" }),
  classSessionId: z.string({ message: "classSessionId is required" }),
  status: z.enum(["PRESENT", "ABSENT", "LATE"]).optional(),
  markedAt: z.coerce.date().optional(),
});

export const updateTeacherAttendanceSchema = createTeacherAttendanceSchema.partial();

export type CreateTeacherAttendanceSchema = z.infer<typeof createTeacherAttendanceSchema>;
export type UpdateTeacherAttendanceSchema = z.infer<typeof updateTeacherAttendanceSchema>;

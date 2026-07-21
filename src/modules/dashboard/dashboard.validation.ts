import { z } from "zod";

const attendanceStatusEnum = z.enum(["PRESENT", "ABSENT", "LATE"]);
const noticeTargetEnum = z.enum(["ALL", "STUDENT", "INSTRUCTOR", "PRINCIPAL"]);

export const submitAttendanceSchema = z.object({
  attendances: z
    .array(
      z.object({
        studentId: z.string().min(1, "studentId is required"),
        status: attendanceStatusEnum,
      }),
    )
    .min(1, "At least one attendance entry is required"),
  selfStatus: attendanceStatusEnum.optional(),
});

export const updateStatusSchema = z.object({
  isSuspended: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isAlert: z.boolean().optional(),
});

export const createNoticeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  target: noticeTargetEnum.optional(),
});

export const updateNoticeSchema = z.object({
  title: z.string().min(1).optional(),
  body: z.string().min(1).optional(),
  target: noticeTargetEnum.optional(),
  isActive: z.boolean().optional(),
});

export type SubmitAttendanceSchema = z.infer<typeof submitAttendanceSchema>;
export type UpdateStatusSchema = z.infer<typeof updateStatusSchema>;
export type CreateNoticeSchema = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeSchema = z.infer<typeof updateNoticeSchema>;

import { z } from "zod";

export const attendanceQuerySchema = z.object({
  month: z.coerce.number().min(1).max(12).optional(),
  year: z.coerce.number().min(2020).max(2030).optional(),
});

export type AttendanceQuery = z.infer<typeof attendanceQuerySchema>;

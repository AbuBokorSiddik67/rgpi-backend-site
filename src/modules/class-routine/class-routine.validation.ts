import { z } from "zod";

export const createClassRoutineSchema = z.object({
  departmentId: z.string({ message: "departmentId is required" }),
  batchId: z.string({ message: "batchId is required" }),
  semesterId: z.string({ message: "semesterId is required" }),
  subjectId: z.string({ message: "subjectId is required" }),
  teacherId: z.string({ message: "teacherId is required" }),
  classRoomId: z.string({ message: "classRoomId is required" }),
  periodId: z.string({ message: "periodId is required" }),
  dayOfWeek: z.enum(["SUN", "MON", "TUE", "WED", "THU"]),
  classType: z.enum(["THEORY", "PRACTICAL"]),
});

export const updateClassRoutineSchema = createClassRoutineSchema.partial();

export type CreateClassRoutineSchema = z.infer<typeof createClassRoutineSchema>;
export type UpdateClassRoutineSchema = z.infer<typeof updateClassRoutineSchema>;

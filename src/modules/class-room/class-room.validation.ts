import { z } from "zod";

export const createClassRoomSchema = z.object({
  classRoomNumber: z.string({ message: "classRoomNumber is required" }),
  departmentId: z.string({ message: "departmentId is required" }),
});

export const updateClassRoomSchema = createClassRoomSchema.partial();

export type CreateClassRoomSchema = z.infer<typeof createClassRoomSchema>;
export type UpdateClassRoomSchema = z.infer<typeof updateClassRoomSchema>;

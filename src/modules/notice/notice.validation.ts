import { z } from "zod";

export const createNoticeSchema = z.object({
  title: z.string({ message: "title is required" }),
  body: z.string({ message: "body is required" }),
  target: z.enum(["ALL", "STUDENT", "INSTRUCTOR", "PRINCIPAL"]).optional(),
  publishedAt: z.coerce.date().optional(),
});

export const updateNoticeSchema = createNoticeSchema.partial();

export type CreateNoticeSchema = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeSchema = z.infer<typeof updateNoticeSchema>;

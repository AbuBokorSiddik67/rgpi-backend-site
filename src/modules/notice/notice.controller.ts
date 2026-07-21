import { Request, Response, NextFunction } from "express";
import { noticeService } from "./notice.service.js";
import { createNoticeSchema, updateNoticeSchema } from "./notice.validation.js";

export const noticeController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createNoticeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const notice = await noticeService.create(parsed.data);
      res.status(201).json({ success: true, message: "Notice created", data: notice });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await noticeService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const notice = await noticeService.findById(req.params.id as string);
      res.json({ success: true, data: notice });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateNoticeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const notice = await noticeService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Notice updated", data: notice });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await noticeService.remove(req.params.id as string);
      res.json({ success: true, message: "Notice deleted" });
    } catch (err) {
      next(err);
    }
  },
};

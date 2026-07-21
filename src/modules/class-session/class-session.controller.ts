import { Request, Response, NextFunction } from "express";
import { classSessionService } from "./class-session.service.js";
import { createClassSessionSchema, updateClassSessionSchema } from "./class-session.validation.js";

export const classSessionController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createClassSessionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const classSession = await classSessionService.create(parsed.data);
      res.status(201).json({ success: true, message: "ClassSession created", data: classSession });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await classSessionService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const classSession = await classSessionService.findById(req.params.id as string);
      res.json({ success: true, data: classSession });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateClassSessionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const classSession = await classSessionService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "ClassSession updated", data: classSession });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await classSessionService.remove(req.params.id as string);
      res.json({ success: true, message: "ClassSession deleted" });
    } catch (err) {
      next(err);
    }
  },
};

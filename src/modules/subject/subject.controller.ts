import { Request, Response, NextFunction } from "express";
import { subjectService } from "./subject.service.js";
import { createSubjectSchema, updateSubjectSchema } from "./subject.validation.js";

export const subjectController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createSubjectSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const subject = await subjectService.create(parsed.data);
      res.status(201).json({ success: true, message: "Subject created", data: subject });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await subjectService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const subject = await subjectService.findById(req.params.id as string);
      res.json({ success: true, data: subject });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateSubjectSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const subject = await subjectService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Subject updated", data: subject });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await subjectService.remove(req.params.id as string);
      res.json({ success: true, message: "Subject deleted" });
    } catch (err) {
      next(err);
    }
  },
};

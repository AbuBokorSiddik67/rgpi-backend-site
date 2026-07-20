import { Request, Response, NextFunction } from "express";
import { semesterService } from "./semester.service.js";
import { createSemesterSchema, updateSemesterSchema } from "./semester.validation.js";

export const semesterController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createSemesterSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const semester = await semesterService.create(parsed.data);
      res.status(201).json({ success: true, message: "Semester created", data: semester });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await semesterService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const semester = await semesterService.findById(req.params.id as string);
      res.json({ success: true, data: semester });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateSemesterSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const semester = await semesterService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Semester updated", data: semester });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await semesterService.remove(req.params.id as string);
      res.json({ success: true, message: "Semester deleted" });
    } catch (err) {
      next(err);
    }
  },
};

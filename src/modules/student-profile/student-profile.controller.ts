import { Request, Response, NextFunction } from "express";
import { studentProfileService } from "./student-profile.service.js";
import { createStudentProfileSchema, updateStudentProfileSchema } from "./student-profile.validation.js";

export const studentProfileController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createStudentProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const studentProfile = await studentProfileService.create(parsed.data);
      res.status(201).json({ success: true, message: "StudentProfile created", data: studentProfile });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await studentProfileService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const studentProfile = await studentProfileService.findById(req.params.id as string);
      res.json({ success: true, data: studentProfile });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateStudentProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const studentProfile = await studentProfileService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "StudentProfile updated", data: studentProfile });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await studentProfileService.remove(req.params.id as string);
      res.json({ success: true, message: "StudentProfile deleted" });
    } catch (err) {
      next(err);
    }
  },
};

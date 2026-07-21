import { Request, Response, NextFunction } from "express";
import { instructorProfileService } from "./instructor-profile.service.js";
import { createInstructorProfileSchema, updateInstructorProfileSchema } from "./instructor-profile.validation.js";

export const instructorProfileController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createInstructorProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const instructorProfile = await instructorProfileService.create(parsed.data);
      res.status(201).json({ success: true, message: "InstructorProfile created", data: instructorProfile });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await instructorProfileService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const instructorProfile = await instructorProfileService.findById(req.params.id as string);
      res.json({ success: true, data: instructorProfile });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateInstructorProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const instructorProfile = await instructorProfileService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "InstructorProfile updated", data: instructorProfile });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await instructorProfileService.remove(req.params.id as string);
      res.json({ success: true, message: "InstructorProfile deleted" });
    } catch (err) {
      next(err);
    }
  },
};

import { Request, Response, NextFunction } from "express";
import { instituteService } from "./institute.service.js";
import { createInstituteSchema, updateInstituteSchema } from "./institute.validation.js";

export const instituteController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createInstituteSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const institute = await instituteService.create(parsed.data);
      res.status(201).json({ success: true, message: "Institute created", data: institute });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await instituteService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const institute = await instituteService.findById(req.params.id as string);
      res.json({ success: true, data: institute });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateInstituteSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const institute = await instituteService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Institute updated", data: institute });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await instituteService.remove(req.params.id as string);
      res.json({ success: true, message: "Institute deleted" });
    } catch (err) {
      next(err);
    }
  },
};

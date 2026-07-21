import { Request, Response, NextFunction } from "express";
import { periodService } from "./period.service.js";
import { createPeriodSchema, updatePeriodSchema } from "./period.validation.js";

export const periodController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createPeriodSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const period = await periodService.create(parsed.data);
      res.status(201).json({ success: true, message: "Period created", data: period });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await periodService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const period = await periodService.findById(req.params.id as string);
      res.json({ success: true, data: period });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updatePeriodSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const period = await periodService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Period updated", data: period });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await periodService.remove(req.params.id as string);
      res.json({ success: true, message: "Period deleted" });
    } catch (err) {
      next(err);
    }
  },
};

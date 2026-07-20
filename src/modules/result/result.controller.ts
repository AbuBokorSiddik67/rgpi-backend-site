import { Request, Response, NextFunction } from "express";
import { resultService } from "./result.service.js";
import { createResultSchema, updateResultSchema } from "./result.validation.js";

export const resultController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createResultSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const result = await resultService.create(parsed.data);
      res.status(201).json({ success: true, message: "Result created", data: result });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await resultService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await resultService.findById(req.params.id as string);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateResultSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const result = await resultService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Result updated", data: result });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await resultService.remove(req.params.id as string);
      res.json({ success: true, message: "Result deleted" });
    } catch (err) {
      next(err);
    }
  },
};

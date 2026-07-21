import { Request, Response, NextFunction } from "express";
import { batchService } from "./batch.service.js";
import { createBatchSchema, updateBatchSchema } from "./batch.validation.js";

export const batchController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createBatchSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const batch = await batchService.create(parsed.data);
      res.status(201).json({ success: true, message: "Batch created", data: batch });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await batchService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const batch = await batchService.findById(req.params.id as string);
      res.json({ success: true, data: batch });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateBatchSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const batch = await batchService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Batch updated", data: batch });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await batchService.remove(req.params.id as string);
      res.json({ success: true, message: "Batch deleted" });
    } catch (err) {
      next(err);
    }
  },
};

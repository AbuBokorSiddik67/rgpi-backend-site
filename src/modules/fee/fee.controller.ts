import { Request, Response, NextFunction } from "express";
import { feeService } from "./fee.service.js";
import { createFeeSchema, updateFeeSchema } from "./fee.validation.js";

export const feeController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createFeeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const fee = await feeService.create(parsed.data);
      res.status(201).json({ success: true, message: "Fee created", data: fee });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await feeService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const fee = await feeService.findById(req.params.id as string);
      res.json({ success: true, data: fee });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateFeeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const fee = await feeService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Fee updated", data: fee });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await feeService.remove(req.params.id as string);
      res.json({ success: true, message: "Fee deleted" });
    } catch (err) {
      next(err);
    }
  },
};

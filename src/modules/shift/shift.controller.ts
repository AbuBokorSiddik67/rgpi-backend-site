import { Request, Response, NextFunction } from "express";
import { shiftService } from "./shift.service.js";
import { createShiftSchema, updateShiftSchema } from "./shift.validation.js";

export const shiftController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createShiftSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const shift = await shiftService.create(parsed.data);
      res.status(201).json({ success: true, message: "Shift created", data: shift });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await shiftService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const shift = await shiftService.findById(req.params.id as string);
      res.json({ success: true, data: shift });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateShiftSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const shift = await shiftService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Shift updated", data: shift });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await shiftService.remove(req.params.id as string);
      res.json({ success: true, message: "Shift deleted" });
    } catch (err) {
      next(err);
    }
  },
};

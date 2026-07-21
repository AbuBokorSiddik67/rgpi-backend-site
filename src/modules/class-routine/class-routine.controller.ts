import { Request, Response, NextFunction } from "express";
import { classRoutineService } from "./class-routine.service.js";
import { createClassRoutineSchema, updateClassRoutineSchema } from "./class-routine.validation.js";

export const classRoutineController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createClassRoutineSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const classRoutine = await classRoutineService.create(parsed.data);
      res.status(201).json({ success: true, message: "ClassRoutine created", data: classRoutine });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await classRoutineService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const classRoutine = await classRoutineService.findById(req.params.id as string);
      res.json({ success: true, data: classRoutine });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateClassRoutineSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const classRoutine = await classRoutineService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "ClassRoutine updated", data: classRoutine });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await classRoutineService.remove(req.params.id as string);
      res.json({ success: true, message: "ClassRoutine deleted" });
    } catch (err) {
      next(err);
    }
  },
};

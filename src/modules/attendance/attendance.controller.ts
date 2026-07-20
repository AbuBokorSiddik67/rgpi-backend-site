import { Request, Response, NextFunction } from "express";
import { attendanceService } from "./attendance.service.js";
import { createAttendanceSchema, updateAttendanceSchema } from "./attendance.validation.js";

export const attendanceController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createAttendanceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const attendance = await attendanceService.create(parsed.data);
      res.status(201).json({ success: true, message: "Attendance created", data: attendance });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await attendanceService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const attendance = await attendanceService.findById(req.params.id as string);
      res.json({ success: true, data: attendance });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateAttendanceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const attendance = await attendanceService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Attendance updated", data: attendance });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await attendanceService.remove(req.params.id as string);
      res.json({ success: true, message: "Attendance deleted" });
    } catch (err) {
      next(err);
    }
  },
};

import { Request, Response, NextFunction } from "express";
import { teacherAttendanceService } from "./teacher-attendance.service.js";
import { createTeacherAttendanceSchema, updateTeacherAttendanceSchema } from "./teacher-attendance.validation.js";

export const teacherAttendanceController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createTeacherAttendanceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const teacherAttendance = await teacherAttendanceService.create(parsed.data);
      res.status(201).json({ success: true, message: "TeacherAttendance created", data: teacherAttendance });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await teacherAttendanceService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherAttendance = await teacherAttendanceService.findById(req.params.id as string);
      res.json({ success: true, data: teacherAttendance });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateTeacherAttendanceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const teacherAttendance = await teacherAttendanceService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "TeacherAttendance updated", data: teacherAttendance });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await teacherAttendanceService.remove(req.params.id as string);
      res.json({ success: true, message: "TeacherAttendance deleted" });
    } catch (err) {
      next(err);
    }
  },
};

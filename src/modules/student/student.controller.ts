import { Request, Response, NextFunction } from "express";
import { studentService } from "./student.service.js";
import { attendanceQuerySchema } from "./student.validation.js";

export const studentController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await studentService.getProfile(req.user!.userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await studentService.getDashboard(req.user!.userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = attendanceQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid query",
        });
      }

      const data = await studentService.getAttendance(
        req.user!.userId,
        parsed.data,
      );
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getNotices(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await studentService.getNotices(req.user!.userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getCareers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await studentService.getCareers(req.user!.userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async getAcademics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await studentService.getAcademics(req.user!.userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

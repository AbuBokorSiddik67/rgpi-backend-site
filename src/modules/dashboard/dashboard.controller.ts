import { Request, Response, NextFunction } from "express";
import { dashboardService } from "./dashboard.service.js";
import {
  submitAttendanceSchema,
  updateStatusSchema,
  createNoticeSchema,
  updateNoticeSchema,
} from "./dashboard.validation.js";

/* ─────────────────────────────────────────
   STUDENT
───────────────────────────────────────── */

export const studentDashboardController = {
  async overview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId as string;
      const data = await dashboardService.getStudentOverview(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async attendance(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId as string;
      const { subjectId } = req.query;
      const data = await dashboardService.getStudentAttendance(userId, {
        subjectId: subjectId as string | undefined,
      });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async routine(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId as string;
      const data = await dashboardService.getStudentRoutine(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async results(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId as string;
      const data = await dashboardService.getStudentResults(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
};

/* ─────────────────────────────────────────
   TEACHER (INSTRUCTOR)
───────────────────────────────────────── */

export const teacherDashboardController = {
  async overview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId as string;
      const data = await dashboardService.getTeacherOverview(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async routine(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId as string;
      const data = await dashboardService.getTeacherRoutine(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async sessionStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId as string;
      const { sessionId } = req.params;
      const data = await dashboardService.getSessionStudents(userId as string, sessionId as string);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async submitAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = submitAttendanceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const userId = req.user!.userId as string;
      const { sessionId } = req.params;
      await dashboardService.submitAttendance(userId as string, sessionId as string, parsed.data);
      res.json({ success: true, message: "Attendance submitted successfully" });
    } catch (err) {
      next(err);
    }
  },
};

/* ─────────────────────────────────────────
   ADMIN (CI / PRINCIPAL)
───────────────────────────────────────── */

export const adminDashboardController = {
  async overview(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getAdminOverview();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async departments(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getDepartments();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async students(req: Request, res: Response, next: NextFunction) {
    try {
      const { departmentId, batchId, search } = req.query;
      const data = await dashboardService.getStudentsList({
        departmentId: departmentId as string | undefined,
        batchId: batchId as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async teachers(req: Request, res: Response, next: NextFunction) {
    try {
      const { departmentId, search } = req.query;
      const data = await dashboardService.getTeachersList({
        departmentId: departmentId as string | undefined,
        search: search as string | undefined,
      });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async updateStudentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const { id } = req.params;
      const data = await dashboardService.updateStudentStatus(id as string, parsed.data);
      res.json({ success: true, message: "Student status updated", data });
    } catch (err) {
      next(err);
    }
  },

  async updateTeacherStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const { id } = req.params;
      const data = await dashboardService.updateTeacherStatus(id as string, parsed.data);
      res.json({ success: true, message: "Teacher status updated", data });
    } catch (err) {
      next(err);
    }
  },

  async createNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createNoticeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const data = await dashboardService.createNotice(parsed.data);
      res.status(201).json({ success: true, message: "Notice published", data });
    } catch (err) {
      next(err);
    }
  },

  async updateNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateNoticeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const { id } = req.params;
      const data = await dashboardService.updateNotice(id as string, parsed.data);
      res.json({ success: true, message: "Notice updated", data });
    } catch (err) {
      next(err);
    }
  },

  async deleteNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await dashboardService.deleteNotice(id as string);
      res.json({ success: true, message: "Notice deleted" });
    } catch (err) {
      next(err);
    }
  },
};

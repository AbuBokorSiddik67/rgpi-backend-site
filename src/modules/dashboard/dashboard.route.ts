import { Router } from "express";
import {
  studentDashboardController,
  teacherDashboardController,
  adminDashboardController,
} from "./dashboard.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { ROLES } from "../../constants/constants.js";

const router = Router();



/* ─────────────────────────────────────────
   STUDENT ROUTES — only STUDENT role
───────────────────────────────────────── */
/**
 * @openapi
 * info:
 *   title: Dashboard API
 *   version: 1.0.0
 *   description: Consolidated endpoints for Student, Instructor, and Admin dashboard views in the RGPI system.
 * servers:
 *   - url: http://localhost:5000/api/v1
 *     description: Local Development Server
 * tags:
 *   - name: Dashboard
 *     description: Aggregated summary and statistics endpoints for dashboard interfaces.
 */
router.get(
  "/student",
  authenticate,
  authorize(ROLES.STUDENT),
  studentDashboardController.overview,
);
router.get(
  "/student/attendance",
  authenticate,
  authorize(ROLES.STUDENT),
  studentDashboardController.attendance,
);
router.get(
  "/student/routine",
  authenticate,
  authorize(ROLES.STUDENT),
  studentDashboardController.routine,
);
router.get(
  "/student/results",
  authenticate,
  authorize(ROLES.STUDENT),
  studentDashboardController.results,
);

/* ─────────────────────────────────────────
   TEACHER (INSTRUCTOR) ROUTES — only INSTRUCTOR role
───────────────────────────────────────── */

router.get(
  "/teacher",
  authenticate,
  authorize(ROLES.INSTRUCTOR),
  teacherDashboardController.overview,
);
router.get(
  "/teacher/routine",
  authenticate,
  authorize(ROLES.INSTRUCTOR),
  teacherDashboardController.routine,
);
router.get(
  "/teacher/sessions/:sessionId/students",
  authenticate,
  authorize(ROLES.INSTRUCTOR),
  teacherDashboardController.sessionStudents,
);
router.post(
  "/teacher/sessions/:sessionId/attendance",
  authenticate,
  authorize(ROLES.INSTRUCTOR),
  teacherDashboardController.submitAttendance,
);

/* ─────────────────────────────────────────
   ADMIN ROUTES — only CI and PRINCIPAL roles (full control)
───────────────────────────────────────── */

router.get(
  "/admin/overview",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.overview,
);
router.get(
  "/admin/departments",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.departments,
);
router.get(
  "/admin/students",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.students,
);
router.get(
  "/admin/teachers",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.teachers,
);
router.patch(
  "/admin/students/:id/status",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.updateStudentStatus,
);
router.patch(
  "/admin/teachers/:id/status",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.updateTeacherStatus,
);
router.post(
  "/admin/notices",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.createNotice,
);
router.patch(
  "/admin/notices/:id",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.updateNotice,
);
router.delete(
  "/admin/notices/:id",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  adminDashboardController.deleteNotice,
);

export const dashboardRouter = router;

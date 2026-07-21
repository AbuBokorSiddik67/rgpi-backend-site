import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route.js";
import { dbConnectionStatus } from "../lib/prisma.js";
import { instituteRouter } from "../modules/institute/institute.route.js";
import { departmentRouter } from "../modules/department/department.route.js";
import { shiftRouter } from "../modules/shift/shift.route.js";
import { periodRouter } from "../modules/period/period.route.js";
import { semesterRouter } from "../modules/semester/semester.route.js";
import { sessionRouter } from "../modules/session/session.route.js";
import { batchRouter } from "../modules/batch/batch.route.js";
import { instructorProfileRouter } from "../modules/instructor-profile/instructor-profile.route.js";
import { principalProfileRouter } from "../modules/principal-profile/principal-profile.route.js";
import { studentProfileRouter } from "../modules/student-profile/student-profile.route.js";
import { subjectRouter } from "../modules/subject/subject.route.js";
import { classRoomRouter } from "../modules/class-room/class-room.route.js";
import { classRoutineRouter } from "../modules/class-routine/class-routine.route.js";
import { classSessionRouter } from "../modules/class-session/class-session.route.js";
import { attendanceRouter } from "../modules/attendance/attendance.route.js";
import { teacherAttendanceRouter } from "../modules/teacher-attendance/teacher-attendance.route.js";
import { resultRouter } from "../modules/result/result.route.js";
import { feeRouter } from "../modules/fee/fee.route.js";
import { noticeRouter } from "../modules/notice/notice.route.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.route.js";

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 */
router.get("/health", (_req, res) => {
  const isConnected = dbConnectionStatus === "Connected";
  res.status(isConnected ? 200 : 500).json({
    success: isConnected,
    status: isConnected ? "UP" : "DOWN",
    database: dbConnectionStatus,
    timestamp: new Date().toISOString(),
  });
});

// Public Routes
router.use("/auth", authRouter);
router.use("/institutes", instituteRouter);
router.use("/departments", departmentRouter);
router.use("/shifts", shiftRouter);
router.use("/periods", periodRouter);
router.use("/semesters", semesterRouter);
router.use("/sessions", sessionRouter);
router.use("/batches", batchRouter);
router.use("/student-profiles", studentProfileRouter);
router.use("/subjects", subjectRouter);
router.use("/class-rooms", classRoomRouter);
router.use("/class-routines", classRoutineRouter);
router.use("/class-sessions", classSessionRouter);
router.use("/attendances", attendanceRouter);
router.use("/teacher-attendances", teacherAttendanceRouter);
router.use("/results", resultRouter);
router.use("/fees", feeRouter);
router.use("/notices", noticeRouter);

// Private Routes
router.use("/instructor-profiles", instructorProfileRouter);
router.use("/principal-profiles", principalProfileRouter);
router.use("/dashboard", dashboardRouter);

export const appRouter = router;

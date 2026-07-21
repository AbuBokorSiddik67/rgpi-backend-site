import { Router } from "express";
import { teacherAttendanceController } from "./teacher-attendance.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/teacher-attendances:
 *   post:
 *     summary: Create TeacherAttendance
 *     tags: [TeacherAttendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             teacherId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             classSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             status: "PRESENT"
 *     responses:
 *       201:
 *         description: TeacherAttendance created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, teacherAttendanceController.create);

/**
 * @openapi
 * /api/v1/teacher-attendances:
 *   get:
 *     summary: List TeacherAttendances (paginated)
 *     tags: [TeacherAttendance]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default 20)
 *     responses:
 *       200:
 *         description: List of TeacherAttendances with pagination info
 */
router.get("/", authenticate, teacherAttendanceController.getAll);

/**
 * @openapi
 * /api/v1/teacher-attendances/{id}:
 *   get:
 *     summary: Get a single TeacherAttendance
 *     tags: [TeacherAttendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TeacherAttendance found
 *       404:
 *         description: TeacherAttendance not found
 */
router.get("/:id", authenticate, teacherAttendanceController.getById);

/**
 * @openapi
 * /api/v1/teacher-attendances/{id}:
 *   patch:
 *     summary: Update a TeacherAttendance (any subset of fields below)
 *     tags: [TeacherAttendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             teacherId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             classSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             status: "PRESENT"
 *     responses:
 *       200:
 *         description: TeacherAttendance updated
 *       404:
 *         description: TeacherAttendance not found
 */
router.patch("/:id", authenticate, teacherAttendanceController.update);

/**
 * @openapi
 * /api/v1/teacher-attendances/{id}:
 *   delete:
 *     summary: Delete a TeacherAttendance
 *     tags: [TeacherAttendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TeacherAttendance deleted
 *       404:
 *         description: TeacherAttendance not found
 */
router.delete("/:id", authenticate, teacherAttendanceController.remove);

export const teacherAttendanceRouter = router;

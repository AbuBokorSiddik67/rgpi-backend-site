import { Router } from "express";
import { attendanceController } from "./attendance.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/attendances:
 *   post:
 *     summary: Create Attendance
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             studentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             classSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             status: "PRESENT"
 *     responses:
 *       201:
 *         description: Attendance created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, attendanceController.create);

/**
 * @openapi
 * /api/v1/attendances:
 *   get:
 *     summary: List Attendances (paginated)
 *     tags: [Attendance]
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
 *         description: List of Attendances with pagination info
 */
router.get("/", authenticate, attendanceController.getAll);

/**
 * @openapi
 * /api/v1/attendances/{id}:
 *   get:
 *     summary: Get a single Attendance
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance found
 *       404:
 *         description: Attendance not found
 */
router.get("/:id", authenticate, attendanceController.getById);

/**
 * @openapi
 * /api/v1/attendances/{id}:
 *   patch:
 *     summary: Update a Attendance (any subset of fields below)
 *     tags: [Attendance]
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
 *             studentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             classSessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             status: "PRESENT"
 *     responses:
 *       200:
 *         description: Attendance updated
 *       404:
 *         description: Attendance not found
 */
router.patch("/:id", authenticate, attendanceController.update);

/**
 * @openapi
 * /api/v1/attendances/{id}:
 *   delete:
 *     summary: Delete a Attendance
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance deleted
 *       404:
 *         description: Attendance not found
 */
router.delete("/:id", authenticate, attendanceController.remove);

export const attendanceRouter = router;

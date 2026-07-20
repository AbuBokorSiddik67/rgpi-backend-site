import { Router } from "express";
import { classSessionController } from "./class-session.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/class-sessions:
 *   post:
 *     summary: Create ClassSession
 *     tags: [ClassSession]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             routineId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             teacherId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             date: "2026-07-20"
 *     responses:
 *       201:
 *         description: ClassSession created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, classSessionController.create);

/**
 * @openapi
 * /api/v1/class-sessions:
 *   get:
 *     summary: List ClassSessions (paginated)
 *     tags: [ClassSession]
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
 *         description: List of ClassSessions with pagination info
 */
router.get("/", authenticate, classSessionController.getAll);

/**
 * @openapi
 * /api/v1/class-sessions/{id}:
 *   get:
 *     summary: Get a single ClassSession
 *     tags: [ClassSession]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ClassSession found
 *       404:
 *         description: ClassSession not found
 */
router.get("/:id", authenticate, classSessionController.getById);

/**
 * @openapi
 * /api/v1/class-sessions/{id}:
 *   patch:
 *     summary: Update a ClassSession (any subset of fields below)
 *     tags: [ClassSession]
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
 *             routineId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             teacherId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             date: "2026-07-20"
 *     responses:
 *       200:
 *         description: ClassSession updated
 *       404:
 *         description: ClassSession not found
 */
router.patch("/:id", authenticate, classSessionController.update);

/**
 * @openapi
 * /api/v1/class-sessions/{id}:
 *   delete:
 *     summary: Delete a ClassSession
 *     tags: [ClassSession]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ClassSession deleted
 *       404:
 *         description: ClassSession not found
 */
router.delete("/:id", authenticate, classSessionController.remove);

export const classSessionRouter = router;

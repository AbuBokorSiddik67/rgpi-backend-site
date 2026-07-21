import { Router } from "express";
import { classRoutineController } from "./class-routine.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/class-routines:
 *   post:
 *     summary: Create ClassRoutine
 *     tags: [ClassRoutine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             batchId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             subjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             teacherId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             classRoomId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             periodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             dayOfWeek: "SUN"
 *             classType: "THEORY"
 *     responses:
 *       201:
 *         description: ClassRoutine created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, classRoutineController.create);

/**
 * @openapi
 * /api/v1/class-routines:
 *   get:
 *     summary: List ClassRoutines (paginated)
 *     tags: [ClassRoutine]
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
 *         description: List of ClassRoutines with pagination info
 */
router.get("/", authenticate, classRoutineController.getAll);

/**
 * @openapi
 * /api/v1/class-routines/{id}:
 *   get:
 *     summary: Get a single ClassRoutine
 *     tags: [ClassRoutine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ClassRoutine found
 *       404:
 *         description: ClassRoutine not found
 */
router.get("/:id", authenticate, classRoutineController.getById);

/**
 * @openapi
 * /api/v1/class-routines/{id}:
 *   patch:
 *     summary: Update a ClassRoutine (any subset of fields below)
 *     tags: [ClassRoutine]
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
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             batchId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             subjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             teacherId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             classRoomId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             periodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             dayOfWeek: "SUN"
 *             classType: "THEORY"
 *     responses:
 *       200:
 *         description: ClassRoutine updated
 *       404:
 *         description: ClassRoutine not found
 */
router.patch("/:id", authenticate, classRoutineController.update);

/**
 * @openapi
 * /api/v1/class-routines/{id}:
 *   delete:
 *     summary: Delete a ClassRoutine
 *     tags: [ClassRoutine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ClassRoutine deleted
 *       404:
 *         description: ClassRoutine not found
 */
router.delete("/:id", authenticate, classRoutineController.remove);

export const classRoutineRouter = router;

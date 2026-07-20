import { Router } from "express";
import { resultController } from "./result.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/results:
 *   post:
 *     summary: Create Result
 *     tags: [Result]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             studentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             subjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             contTheory: 18
 *             finalTheory: 65
 *             contPractical: 9
 *             finalPractical: 18
 *             totalMarks: 110
 *             grade: "A"
 *             gpa: 3.75
 *     responses:
 *       201:
 *         description: Result created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, resultController.create);

/**
 * @openapi
 * /api/v1/results:
 *   get:
 *     summary: List Results (paginated)
 *     tags: [Result]
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
 *         description: List of Results with pagination info
 */
router.get("/", authenticate, resultController.getAll);

/**
 * @openapi
 * /api/v1/results/{id}:
 *   get:
 *     summary: Get a single Result
 *     tags: [Result]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Result found
 *       404:
 *         description: Result not found
 */
router.get("/:id", authenticate, resultController.getById);

/**
 * @openapi
 * /api/v1/results/{id}:
 *   patch:
 *     summary: Update a Result (any subset of fields below)
 *     tags: [Result]
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
 *             subjectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             contTheory: 18
 *             finalTheory: 65
 *             contPractical: 9
 *             finalPractical: 18
 *             totalMarks: 110
 *             grade: "A"
 *             gpa: 3.75
 *     responses:
 *       200:
 *         description: Result updated
 *       404:
 *         description: Result not found
 */
router.patch("/:id", authenticate, resultController.update);

/**
 * @openapi
 * /api/v1/results/{id}:
 *   delete:
 *     summary: Delete a Result
 *     tags: [Result]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Result deleted
 *       404:
 *         description: Result not found
 */
router.delete("/:id", authenticate, resultController.remove);

export const resultRouter = router;

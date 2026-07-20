import { Router } from "express";
import { semesterController } from "./semester.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/semesters:
 *   post:
 *     summary: Create Semester
 *     tags: [Semester]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             semesterNumber: 5
 *             classLoad: 20
 *             startDate: "2026-07-01"
 *     responses:
 *       201:
 *         description: Semester created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, semesterController.create);

/**
 * @openapi
 * /api/v1/semesters:
 *   get:
 *     summary: List Semesters (paginated)
 *     tags: [Semester]
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
 *         description: List of Semesters with pagination info
 */
router.get("/", authenticate, semesterController.getAll);

/**
 * @openapi
 * /api/v1/semesters/{id}:
 *   get:
 *     summary: Get a single Semester
 *     tags: [Semester]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Semester found
 *       404:
 *         description: Semester not found
 */
router.get("/:id", authenticate, semesterController.getById);

/**
 * @openapi
 * /api/v1/semesters/{id}:
 *   patch:
 *     summary: Update a Semester (any subset of fields below)
 *     tags: [Semester]
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
 *             semesterNumber: 5
 *             classLoad: 20
 *             startDate: "2026-07-01"
 *     responses:
 *       200:
 *         description: Semester updated
 *       404:
 *         description: Semester not found
 */
router.patch("/:id", authenticate, semesterController.update);

/**
 * @openapi
 * /api/v1/semesters/{id}:
 *   delete:
 *     summary: Delete a Semester
 *     tags: [Semester]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Semester deleted
 *       404:
 *         description: Semester not found
 */
router.delete("/:id", authenticate, semesterController.remove);

export const semesterRouter = router;

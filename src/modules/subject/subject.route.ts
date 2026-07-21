import { Router } from "express";
import { subjectController } from "./subject.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/subjects:
 *   post:
 *     summary: Create Subject
 *     tags: [Subject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             subjectName: "Data Structures & Algorithms"
 *             subjectCode: "6621"
 *             credit: 4
 *             theoryClass: 3
 *             practicalClass: 1
 *             grandTotal: 100
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       201:
 *         description: Subject created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, subjectController.create);

/**
 * @openapi
 * /api/v1/subjects:
 *   get:
 *     summary: List Subjects (paginated)
 *     tags: [Subject]
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
 *         description: List of Subjects with pagination info
 */
router.get("/", authenticate, subjectController.getAll);

/**
 * @openapi
 * /api/v1/subjects/{id}:
 *   get:
 *     summary: Get a single Subject
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject found
 *       404:
 *         description: Subject not found
 */
router.get("/:id", authenticate, subjectController.getById);

/**
 * @openapi
 * /api/v1/subjects/{id}:
 *   patch:
 *     summary: Update a Subject (any subset of fields below)
 *     tags: [Subject]
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
 *             subjectName: "Data Structures & Algorithms"
 *             subjectCode: "6621"
 *             credit: 4
 *             theoryClass: 3
 *             practicalClass: 1
 *             grandTotal: 100
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       200:
 *         description: Subject updated
 *       404:
 *         description: Subject not found
 */
router.patch("/:id", authenticate, subjectController.update);

/**
 * @openapi
 * /api/v1/subjects/{id}:
 *   delete:
 *     summary: Delete a Subject
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject deleted
 *       404:
 *         description: Subject not found
 */
router.delete("/:id", authenticate, subjectController.remove);

export const subjectRouter = router;

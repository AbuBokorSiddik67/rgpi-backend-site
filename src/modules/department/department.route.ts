import { Router } from "express";
import { departmentController } from "./department.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/departments:
 *   post:
 *     summary: Create Department
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             instituteId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             dptName: "Computer Science & Technology"
 *     responses:
 *       201:
 *         description: Department created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, departmentController.create);

/**
 * @openapi
 * /api/v1/departments:
 *   get:
 *     summary: List Departments (paginated)
 *     tags: [Department]
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
 *         description: List of Departments with pagination info
 */
router.get("/", authenticate, departmentController.getAll);

/**
 * @openapi
 * /api/v1/departments/{id}:
 *   get:
 *     summary: Get a single Department
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department found
 *       404:
 *         description: Department not found
 */
router.get("/:id", authenticate, departmentController.getById);

/**
 * @openapi
 * /api/v1/departments/{id}:
 *   patch:
 *     summary: Update a Department (any subset of fields below)
 *     tags: [Department]
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
 *             instituteId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             dptName: "Computer Science & Technology"
 *     responses:
 *       200:
 *         description: Department updated
 *       404:
 *         description: Department not found
 */
router.patch("/:id", authenticate, departmentController.update);

/**
 * @openapi
 * /api/v1/departments/{id}:
 *   delete:
 *     summary: Delete a Department
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted
 *       404:
 *         description: Department not found
 */
router.delete("/:id", authenticate, departmentController.remove);

export const departmentRouter = router;

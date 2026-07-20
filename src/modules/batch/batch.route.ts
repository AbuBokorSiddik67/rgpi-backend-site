import { Router } from "express";
import { batchController } from "./batch.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/batches:
 *   post:
 *     summary: Create Batch
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             batchName: "CST-61"
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             shiftId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             sessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       201:
 *         description: Batch created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, batchController.create);

/**
 * @openapi
 * /api/v1/batches:
 *   get:
 *     summary: List Batchs (paginated)
 *     tags: [Batch]
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
 *         description: List of Batchs with pagination info
 */
router.get("/", authenticate, batchController.getAll);

/**
 * @openapi
 * /api/v1/batches/{id}:
 *   get:
 *     summary: Get a single Batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Batch found
 *       404:
 *         description: Batch not found
 */
router.get("/:id", authenticate, batchController.getById);

/**
 * @openapi
 * /api/v1/batches/{id}:
 *   patch:
 *     summary: Update a Batch (any subset of fields below)
 *     tags: [Batch]
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
 *             batchName: "CST-61"
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             semesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             shiftId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             sessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       200:
 *         description: Batch updated
 *       404:
 *         description: Batch not found
 */
router.patch("/:id", authenticate, batchController.update);

/**
 * @openapi
 * /api/v1/batches/{id}:
 *   delete:
 *     summary: Delete a Batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Batch deleted
 *       404:
 *         description: Batch not found
 */
router.delete("/:id", authenticate, batchController.remove);

export const batchRouter = router;

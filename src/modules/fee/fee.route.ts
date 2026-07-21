import { Router } from "express";
import { feeController } from "./fee.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/fees:
 *   post:
 *     summary: Create Fee
 *     tags: [Fee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             studentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             amount: 3500
 *             dueDate: "2026-08-01"
 *             status: "UNPAID"
 *     responses:
 *       201:
 *         description: Fee created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, feeController.create);

/**
 * @openapi
 * /api/v1/fees:
 *   get:
 *     summary: List Fees (paginated)
 *     tags: [Fee]
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
 *         description: List of Fees with pagination info
 */
router.get("/", authenticate, feeController.getAll);

/**
 * @openapi
 * /api/v1/fees/{id}:
 *   get:
 *     summary: Get a single Fee
 *     tags: [Fee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fee found
 *       404:
 *         description: Fee not found
 */
router.get("/:id", authenticate, feeController.getById);

/**
 * @openapi
 * /api/v1/fees/{id}:
 *   patch:
 *     summary: Update a Fee (any subset of fields below)
 *     tags: [Fee]
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
 *             amount: 3500
 *             dueDate: "2026-08-01"
 *             status: "UNPAID"
 *     responses:
 *       200:
 *         description: Fee updated
 *       404:
 *         description: Fee not found
 */
router.patch("/:id", authenticate, feeController.update);

/**
 * @openapi
 * /api/v1/fees/{id}:
 *   delete:
 *     summary: Delete a Fee
 *     tags: [Fee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fee deleted
 *       404:
 *         description: Fee not found
 */
router.delete("/:id", authenticate, feeController.remove);

export const feeRouter = router;

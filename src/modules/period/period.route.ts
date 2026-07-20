import { Router } from "express";
import { periodController } from "./period.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/periods:
 *   post:
 *     summary: Create Period
 *     tags: [Period]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             periodNumber: 1
 *             startTime: "09:00"
 *             endTime: "09:50"
 *             shiftId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       201:
 *         description: Period created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, periodController.create);

/**
 * @openapi
 * /api/v1/periods:
 *   get:
 *     summary: List Periods (paginated)
 *     tags: [Period]
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
 *         description: List of Periods with pagination info
 */
router.get("/", authenticate, periodController.getAll);

/**
 * @openapi
 * /api/v1/periods/{id}:
 *   get:
 *     summary: Get a single Period
 *     tags: [Period]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Period found
 *       404:
 *         description: Period not found
 */
router.get("/:id", authenticate, periodController.getById);

/**
 * @openapi
 * /api/v1/periods/{id}:
 *   patch:
 *     summary: Update a Period (any subset of fields below)
 *     tags: [Period]
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
 *             periodNumber: 1
 *             startTime: "09:00"
 *             endTime: "09:50"
 *             shiftId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       200:
 *         description: Period updated
 *       404:
 *         description: Period not found
 */
router.patch("/:id", authenticate, periodController.update);

/**
 * @openapi
 * /api/v1/periods/{id}:
 *   delete:
 *     summary: Delete a Period
 *     tags: [Period]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Period deleted
 *       404:
 *         description: Period not found
 */
router.delete("/:id", authenticate, periodController.remove);

export const periodRouter = router;

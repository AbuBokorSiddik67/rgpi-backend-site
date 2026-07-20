import { Router } from "express";
import { shiftController } from "./shift.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/shifts:
 *   post:
 *     summary: Create Shift
 *     tags: [Shift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             shiftNumber: 1
 *     responses:
 *       201:
 *         description: Shift created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, shiftController.create);

/**
 * @openapi
 * /api/v1/shifts:
 *   get:
 *     summary: List Shifts (paginated)
 *     tags: [Shift]
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
 *         description: List of Shifts with pagination info
 */
router.get("/", authenticate, shiftController.getAll);

/**
 * @openapi
 * /api/v1/shifts/{id}:
 *   get:
 *     summary: Get a single Shift
 *     tags: [Shift]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shift found
 *       404:
 *         description: Shift not found
 */
router.get("/:id", authenticate, shiftController.getById);

/**
 * @openapi
 * /api/v1/shifts/{id}:
 *   patch:
 *     summary: Update a Shift (any subset of fields below)
 *     tags: [Shift]
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
 *             shiftNumber: 1
 *     responses:
 *       200:
 *         description: Shift updated
 *       404:
 *         description: Shift not found
 */
router.patch("/:id", authenticate, shiftController.update);

/**
 * @openapi
 * /api/v1/shifts/{id}:
 *   delete:
 *     summary: Delete a Shift
 *     tags: [Shift]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shift deleted
 *       404:
 *         description: Shift not found
 */
router.delete("/:id", authenticate, shiftController.remove);

export const shiftRouter = router;

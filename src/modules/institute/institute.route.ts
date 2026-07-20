import { Router } from "express";
import { instituteController } from "./institute.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/institutes:
 *   post:
 *     summary: Create Institute
 *     tags: [Institute]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Rajshahi Polytechnic Institute"
 *             address: "Rajshahi, Bangladesh"
 *     responses:
 *       201:
 *         description: Institute created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, instituteController.create);

/**
 * @openapi
 * /api/v1/institutes:
 *   get:
 *     summary: List Institutes (paginated)
 *     tags: [Institute]
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
 *         description: List of Institutes with pagination info
 */
router.get("/", authenticate, instituteController.getAll);

/**
 * @openapi
 * /api/v1/institutes/{id}:
 *   get:
 *     summary: Get a single Institute
 *     tags: [Institute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Institute found
 *       404:
 *         description: Institute not found
 */
router.get("/:id", authenticate, instituteController.getById);

/**
 * @openapi
 * /api/v1/institutes/{id}:
 *   patch:
 *     summary: Update a Institute (any subset of fields below)
 *     tags: [Institute]
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
 *             name: "Rajshahi Polytechnic Institute"
 *             address: "Rajshahi, Bangladesh"
 *     responses:
 *       200:
 *         description: Institute updated
 *       404:
 *         description: Institute not found
 */
router.patch("/:id", authenticate, instituteController.update);

/**
 * @openapi
 * /api/v1/institutes/{id}:
 *   delete:
 *     summary: Delete a Institute
 *     tags: [Institute]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Institute deleted
 *       404:
 *         description: Institute not found
 */
router.delete("/:id", authenticate, instituteController.remove);

export const instituteRouter = router;

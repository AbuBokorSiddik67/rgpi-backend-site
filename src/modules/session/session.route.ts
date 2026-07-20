import { Router } from "express";
import { sessionController } from "./session.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { ROLES } from "../../constants/constants.js";

const router = Router();

/**
 * @openapi
 * /api/v1/sessions:
 *   post:
 *     summary: Create Session
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             sessionYear: "2024-2025"
 *     responses:
 *       201:
 *         description: Session created
 *       400:
 *         description: Validation failed
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.PRINCIPAL),
  sessionController.create,
);

/**
 * @openapi
 * /api/v1/sessions:
 *   get:
 *     summary: List Sessions (paginated)
 *     tags: [Session]
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
 *         description: List of Sessions with pagination info
 */
router.get("/", authenticate, sessionController.getAll);

/**
 * @openapi
 * /api/v1/sessions/{id}:
 *   get:
 *     summary: Get a single Session
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session found
 *       404:
 *         description: Session not found
 */
router.get("/:id", authenticate, sessionController.getById);

/**
 * @openapi
 * /api/v1/sessions/{id}:
 *   patch:
 *     summary: Update a Session (any subset of fields below)
 *     tags: [Session]
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
 *             sessionYear: "2024-2025"
 *     responses:
 *       200:
 *         description: Session updated
 *       404:
 *         description: Session not found
 */
router.patch("/:id", authenticate, sessionController.update);

/**
 * @openapi
 * /api/v1/sessions/{id}:
 *   delete:
 *     summary: Delete a Session
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session deleted
 *       404:
 *         description: Session not found
 */
router.delete("/:id", authenticate, sessionController.remove);

export const sessionRouter = router;

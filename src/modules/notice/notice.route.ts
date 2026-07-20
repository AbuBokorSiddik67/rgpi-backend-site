import { Router } from "express";
import { noticeController } from "./notice.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/notices:
 *   post:
 *     summary: Create Notice
 *     tags: [Notice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Semester Final Routine Published"
 *             body: "The final exam routine for Semester 5 has been published."
 *             target: "STUDENT"
 *     responses:
 *       201:
 *         description: Notice created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, noticeController.create);

/**
 * @openapi
 * /api/v1/notices:
 *   get:
 *     summary: List Notices (paginated)
 *     tags: [Notice]
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
 *         description: List of Notices with pagination info
 */
router.get("/", authenticate, noticeController.getAll);

/**
 * @openapi
 * /api/v1/notices/{id}:
 *   get:
 *     summary: Get a single Notice
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice found
 *       404:
 *         description: Notice not found
 */
router.get("/:id", authenticate, noticeController.getById);

/**
 * @openapi
 * /api/v1/notices/{id}:
 *   patch:
 *     summary: Update a Notice (any subset of fields below)
 *     tags: [Notice]
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
 *             title: "Semester Final Routine Published"
 *             body: "The final exam routine for Semester 5 has been published."
 *             target: "STUDENT"
 *     responses:
 *       200:
 *         description: Notice updated
 *       404:
 *         description: Notice not found
 */
router.patch("/:id", authenticate, noticeController.update);

/**
 * @openapi
 * /api/v1/notices/{id}:
 *   delete:
 *     summary: Delete a Notice
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice deleted
 *       404:
 *         description: Notice not found
 */
router.delete("/:id", authenticate, noticeController.remove);

export const noticeRouter = router;

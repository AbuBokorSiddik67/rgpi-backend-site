import { Router } from "express";
import { classRoomController } from "./class-room.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/class-rooms:
 *   post:
 *     summary: Create ClassRoom
 *     tags: [ClassRoom]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             classRoomNumber: "301"
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       201:
 *         description: ClassRoom created
 *       400:
 *         description: Validation failed
 */
router.post("/", authenticate, classRoomController.create);

/**
 * @openapi
 * /api/v1/class-rooms:
 *   get:
 *     summary: List ClassRooms (paginated)
 *     tags: [ClassRoom]
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
 *         description: List of ClassRooms with pagination info
 */
router.get("/", authenticate, classRoomController.getAll);

/**
 * @openapi
 * /api/v1/class-rooms/{id}:
 *   get:
 *     summary: Get a single ClassRoom
 *     tags: [ClassRoom]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ClassRoom found
 *       404:
 *         description: ClassRoom not found
 */
router.get("/:id", authenticate, classRoomController.getById);

/**
 * @openapi
 * /api/v1/class-rooms/{id}:
 *   patch:
 *     summary: Update a ClassRoom (any subset of fields below)
 *     tags: [ClassRoom]
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
 *             classRoomNumber: "301"
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       200:
 *         description: ClassRoom updated
 *       404:
 *         description: ClassRoom not found
 */
router.patch("/:id", authenticate, classRoomController.update);

/**
 * @openapi
 * /api/v1/class-rooms/{id}:
 *   delete:
 *     summary: Delete a ClassRoom
 *     tags: [ClassRoom]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ClassRoom deleted
 *       404:
 *         description: ClassRoom not found
 */
router.delete("/:id", authenticate, classRoomController.remove);

export const classRoomRouter = router;

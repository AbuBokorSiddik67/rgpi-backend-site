import { Router } from "express";
import { instructorProfileController } from "./instructor-profile.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { ROLES } from "../../constants/constants.js";

const router = Router();

/**
 * @openapi
 * /api/v1/instructor-profiles:
 *   post:
 *     summary: Create InstructorProfile
 *     tags: [InstructorProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             adminName: "Md. Rakibul Islam"
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             position: "Instructor"
 *     responses:
 *       201:
 *         description: InstructorProfile created
 *       400:
 *         description: Validation failed
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.INSTRUCTOR, ROLES.CI, ROLES.PRINCIPAL),
  instructorProfileController.create,
);

/**
 * @openapi
 * /api/v1/instructor-profiles:
 *   get:
 *     summary: List InstructorProfiles (paginated)
 *     tags: [InstructorProfile]
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
 *         description: List of InstructorProfiles with pagination info
 */
router.get("/", authenticate, instructorProfileController.getAll);

/**
 * @openapi
 * /api/v1/instructor-profiles/{id}:
 *   get:
 *     summary: Get a single InstructorProfile
 *     tags: [InstructorProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: InstructorProfile found
 *       404:
 *         description: InstructorProfile not found
 */
router.get("/:id", authenticate, instructorProfileController.getById);

/**
 * @openapi
 * /api/v1/instructor-profiles/{id}:
 *   patch:
 *     summary: Update a InstructorProfile (any subset of fields below)
 *     tags: [InstructorProfile]
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
 *             userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             adminName: "Md. Rakibul Islam"
 *             departmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             position: "Instructor"
 *     responses:
 *       200:
 *         description: InstructorProfile updated
 *       404:
 *         description: InstructorProfile not found
 */
router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.INSTRUCTOR, ROLES.CI, ROLES.PRINCIPAL),
  instructorProfileController.update,
);

/**
 * @openapi
 * /api/v1/instructor-profiles/{id}:
 *   delete:
 *     summary: Delete a InstructorProfile
 *     tags: [InstructorProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: InstructorProfile deleted
 *       404:
 *         description: InstructorProfile not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  instructorProfileController.remove,
);

export const instructorProfileRouter = router;

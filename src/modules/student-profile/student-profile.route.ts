import { Router } from "express";
import { studentProfileController } from "./student-profile.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

/**
 * @openapi
 * /api/v1/student-profiles:
 *   post:
 *     summary: Create StudentProfile
 *     tags: [StudentProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             roll: "203001"
 *             studentName: "Rahim Uddin"
 *             gender: "MALE"
 *             batchId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       201:
 *         description: StudentProfile created
 *       400:
 *         description: Validation failed
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.PRINCIPAL, ROLES.CI, ROLES.INSTRUCTOR, ROLES.STUDENT),
  studentProfileController.create,
);

/**
 * @openapi
 * /api/v1/student-profiles:
 *   get:
 *     summary: List StudentProfiles (paginated)
 *     tags: [StudentProfile]
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
 *         description: List of StudentProfiles with pagination info
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.STUDENT, ROLES.CI, ROLES.INSTRUCTOR, ROLES.PRINCIPAL),
  studentProfileController.getAll,
);

/**
 * @openapi
 * /api/v1/student-profiles/{id}:
 *   get:
 *     summary: Get a single StudentProfile
 *     tags: [StudentProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentProfile found
 *       404:
 *         description: StudentProfile not found
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.STUDENT, ROLES.CI, ROLES.INSTRUCTOR, ROLES.PRINCIPAL),
  studentProfileController.getById,
);

/**
 * @openapi
 * /api/v1/student-profiles/{id}:
 *   patch:
 *     summary: Update a StudentProfile (any subset of fields below)
 *     tags: [StudentProfile]
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
 *             roll: "203001"
 *             studentName: "Rahim Uddin"
 *             gender: "MALE"
 *             batchId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       200:
 *         description: StudentProfile updated
 *       404:
 *         description: StudentProfile not found
 */
router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.STUDENT, ROLES.CI, ROLES.INSTRUCTOR, ROLES.PRINCIPAL),
  studentProfileController.update,
);

/**
 * @openapi
 * /api/v1/student-profiles/{id}:
 *   delete:
 *     summary: Delete a StudentProfile
 *     tags: [StudentProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StudentProfile deleted
 *       404:
 *         description: StudentProfile not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.CI, ROLES.PRINCIPAL),
  studentProfileController.remove,
);

export const studentProfileRouter = router;

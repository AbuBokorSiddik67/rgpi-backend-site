import { Router } from "express";
import { principalProfileController } from "./principal-profile.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { ROLES } from "../../constants/constants.js";

const router = Router();

/**
 * @openapi
 * /api/v1/principal-profiles:
 *   post:
 *     summary: Create PrincipalProfile
 *     tags: [PrincipalProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *             superAdminName: "Dr. Abdul Karim"
 *     responses:
 *       201:
 *         description: PrincipalProfile created
 *       400:
 *         description: Validation failed
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.PRINCIPAL),
  principalProfileController.create,
);

/**
 * @openapi
 * /api/v1/principal-profiles:
 *   get:
 *     summary: List PrincipalProfiles (paginated)
 *     tags: [PrincipalProfile]
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
 *         description: List of PrincipalProfiles with pagination info
 */
router.get("/", authenticate, principalProfileController.getAll);

/**
 * @openapi
 * /api/v1/principal-profiles/{id}:
 *   get:
 *     summary: Get a single PrincipalProfile
 *     tags: [PrincipalProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PrincipalProfile found
 *       404:
 *         description: PrincipalProfile not found
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.PRINCIPAL),
  principalProfileController.getById,
);

/**
 * @openapi
 * /api/v1/principal-profiles/{id}:
 *   patch:
 *     summary: Update a PrincipalProfile (any subset of fields below)
 *     tags: [PrincipalProfile]
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
 *             superAdminName: "Dr. Abdul Karim"
 *     responses:
 *       200:
 *         description: PrincipalProfile updated
 *       404:
 *         description: PrincipalProfile not found
 */
router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.PRINCIPAL),
  principalProfileController.update,
);

/**
 * @openapi
 * /api/v1/principal-profiles/{id}:
 *   delete:
 *     summary: Delete a PrincipalProfile
 *     tags: [PrincipalProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PrincipalProfile deleted
 *       404:
 *         description: PrincipalProfile not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.PRINCIPAL),
  principalProfileController.remove,
);

export const principalProfileRouter = router;

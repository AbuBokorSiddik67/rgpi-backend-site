import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { authRateLimiter } from "../../middlewares/rateLimiter.middleware.js";
import { ROLES } from "../../constants/constants.js";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Student registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation failed or email already in use
 */
router.post("/register", authRateLimiter, authController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Student login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", authRateLimiter, authController.login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", authController.logout);

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current authenticated user
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: User not found
 */
router.get(
  "/me",
  authenticate,
  authorize(ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.PRINCIPAL, ROLES.CI),
  authController.me,
);

export const authRouter = router;

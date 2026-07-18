import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authRateLimiter } from "../../middlewares/rateLimiter.middleware.js";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Student registration
 *     tags: [Auth]
 */
router.post("/register", authRateLimiter, authController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Student login
 *     tags: [Auth]
 */
router.post("/login", authRateLimiter, authController.login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 */
router.post("/logout", authController.logout);

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 */
router.get("/me", authenticate, authController.me);

export const authRouter = router;

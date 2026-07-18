import { Router } from "express";
import { dbConnectionStatus } from "../lib/prisma.js";
import { authRouter } from "../modules/auth/auth.route.js";
import { studentRouter } from "../modules/student/student.route.js";

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 */
router.get("/health", (_req, res) => {
  const isConnected = dbConnectionStatus === "Connected";
  res.status(isConnected ? 200 : 500).json({
    success: isConnected,
    status: isConnected ? "UP" : "DOWN",
    database: dbConnectionStatus,
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRouter);
router.use("/students", studentRouter);

export const appRouter = router;

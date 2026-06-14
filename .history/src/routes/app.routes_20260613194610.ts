import { Router } from "express";
import { dbConnectionStatus } from "../lib/prisma";


const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Get user profile details
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/health", (req, res) => { // 💡 
  const isConnected = dbConnectionStatus === "Connected";
  res.status(isConnected ? 200 : 500).json({
    success: isConnected,
    status: isConnected ? "UP" : "DOWN",
    database: dbConnectionStatus,
    timestamp: new Date().toISOString(),
  });
});


export const appRouter = router;
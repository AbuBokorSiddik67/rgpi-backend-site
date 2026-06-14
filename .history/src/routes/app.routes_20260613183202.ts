import { Router } from "express";
import { dbConnectionStatus } from "../lib/prisma";

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 * get:
 * summary: Check database and server status
 * responses:
 * 200:
 * description: Success
 */
router.get("/health", (req, res) => { // 💡 এখানে শুধু /health হবে, কারণ আগে থেকেই /api/v1 মাউন্ট করা আছে
  const isConnected = dbConnectionStatus === "Connected";
  res.status(isConnected ? 200 : 500).json({
    success: isConnected,
    status: isConnected ? "UP" : "DOWN",
    database: dbConnectionStatus,
    timestamp: new Date().toISOString(),
  });
});


export const appRouter = router;
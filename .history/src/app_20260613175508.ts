import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { setupSwagger } from "./config/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";
import { appRouter } from "./routes/app.routes.js";
import { prisma } from "./lib/prisma.js";

const app: Application = express();

app.use(
  pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => {
        return req.url?.includes("/api-docs") || false;
      },
    },
    serializers: {
      req: () => undefined,
      res: () => undefined,
    },
    customProps: (req) => {
      return {
        visitorIp:
          req.headers["x-forwarded-for"] ||
          req.socket.remoteAddress ||
          "unknown",
        visitorPort: req.socket.remotePort || "unknown",
        deviceProfile: req.headers["user-agent"] || "unknown",
        httpMethod: req.method,
        requestedUrl: req.originalUrl || req.url,
      };
    },
    customSuccessMessage: (req, res, time) => {
      return `[HIT DETECTED] ${req.method} ${req.originalUrl} - Processed in ${time}ms`;
    },
    customErrorMessage: (req, res, err) => {
      return `[HIT ERROR] ${req.method} ${req.originalUrl} - Error: ${err.message}`;
    },
  }),
);

app.use(helmet());
app.use(cors());
app.use(express.json());

setupSwagger(app);

//* Mount API routes under /api/v1
app.use("/api/v1", appRouter);

//* dbConnectionCheck endpoint for health monitoring
let dbConnectionStatus = "Disconnected";
async function checkDbConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`; // Simple query to check connection
    dbConnectionStatus = "Connected";
    logger.info("[DB Connection]: Successfully connected to the database.");
  } catch (error) {
    dbConnectionStatus = "Disconnected";
    logger.error(
      `[DB Connection Error]: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

// Initial DB connection check
checkDbConnection();
// Periodically check DB connection every 5 minutes
setInterval(checkDbConnection, 5 * 60 * 1000);

//* Basic health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    status: "OK",
    dbConnection: dbConnectionStatus,
    message: "RGPI Backend Server is Running!",
  });
});

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Check database and server status
 *     responses:
 *       200:
 *         description: Server is healthy and database is connected.
 *       500:
 *         description: Database is disconnected.
 */
app.get("/health", (req: Request, res: Response) => {
  const isConnected = dbConnectionStatus === "Connected";

  res.status(isConnected ? 200 : 500).json({
    success: isConnected,
    status: isConnected ? "UP" : "DOWN",
    database: dbConnectionStatus,
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);
app.

export default app;

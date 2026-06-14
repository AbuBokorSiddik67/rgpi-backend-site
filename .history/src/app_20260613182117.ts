import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { setupSwagger } from "./config/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { httpLogger } from "./utils/logger.js";
import { appRouter } from "./routes/app.routes.js";
import { checkDbConnection, dbConnectionStatus, prisma } from "./lib/prisma.js";
import { notFound } from "./middlewares/notFound.js";

const app: Application = express();

app.use(httpLogger);
app.use(helmet());
app.use(cors());
app.use(express.json());

//* Mount API routes under /api/v1
app.use("/api/v1", appRouter);

setupSwagger(app);

// Initial DB connection check
checkDbConnection();


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
app.get("/api/v1/health", (req: Request, res: Response) => {
  const isConnected = dbConnectionStatus === "Connected";

  res.status(isConnected ? 200 : 500).json({
    success: isConnected,
    status: isConnected ? "UP" : "DOWN",
    database: dbConnectionStatus,
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);
app.use(notFound);

export default app;

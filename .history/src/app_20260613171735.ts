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
        return req.url?.includes("/api-docs/swagger-ui") || false;
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
  } catch (error as Error) {
    dbConnectionStatus = "Disconnected";
    logger.error(`[DB Connection Error]: ${.message}`);
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
    dbConnection: dbConnectionStatus, // Placeholder - replace with actual DB status if needed
    message: "RGPI Backend Server is Running!",
  });
});

app.use(errorHandler);

export default app;

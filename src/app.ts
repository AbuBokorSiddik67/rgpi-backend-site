import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./lib/swagger.js";
import { errorHandler } from "./utils/errorHandler.js";
import { httpLogger } from "./lib/logger.js";
import { appRouter } from "./routes/app.routes.js";
import { checkDbConnection } from "./lib/prisma.js";
import { notFound } from "./utils/notFound.js";

const app: Application = express();

app.use(httpLogger);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(compression());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
setupSwagger(app);
app.use("/api/v1", appRouter); //* Mount API routes under /api/v1
checkDbConnection();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get user profile details
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the rgpi management API!" });
});

app.use(notFound);
app.use(errorHandler);

export default app;

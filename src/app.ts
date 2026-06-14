import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { setupSwagger } from "./config/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { httpLogger } from "./utils/logger.js";
import { appRouter } from "./routes/app.routes.js";
import { checkDbConnection } from "./lib/prisma.js";
import { notFound } from "./middlewares/notFound.js";

const app: Application = express();

app.use(httpLogger);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());
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

app.use(errorHandler);
app.use(notFound);

export default app;

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { setupSwagger } from "./config/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { httpLogger } from "./utils/logger.js";
import { appRouter } from "./routes/app.routes.js";
import { checkDbConnection, dbConnectionStatus } from "./lib/prisma.js";
import { notFound } from "./middlewares/notFound.js";

const app: Application = express();

app.use(httpLogger);
app.use(helmet());
app.use(cors());
app.use(express.json());
//* Mount API routes under /api/v1

setupSwagger(app);

checkDbConnection();


app.use(errorHandler);
app.use(notFound);

export default app;

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { setupSwagger } from "./config/swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";

const app: Application = express();

app.use(
  pinoHttp({
    logger,
    autoLogging: {
      ignore: (req) => {
        return req.url?.includes("/api-docs/swagger-ui") || false;
      },
    },
    // 💡 ম্যাজিক লাইন: এই দুটো লাইন যোগ করলে req এবং res এর ওই বড় হিজিবিজি অবজেক্ট গায়েব হয়ে যাবে!
    serializers: {
      req: () => undefined, // রিকোয়েস্ট অবজেক্ট হাইড করো
      res: () => undefined, // রেসপন্স অবজেক্ট হাইড করো
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
      return `🚀 [HIT DETECTED] ${req.method} ${req.originalUrl} - Processed in ${time}ms`;
    },
    customErrorMessage: (req, res, err) => {
      return `❌ [HIT ERROR] ${req.method} ${req.originalUrl} - Error: ${err.message}`;
    },
  }),
);

app.use(helmet());
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "RGPI Backend is Running!" });
});

app.use(errorHandler);

export default app;

import { Request, Response } from "express";
import pino from "pino";
import { pinoHttp } from "pino-http";
import { AuthPayload } from "../middlewares/auth.middleware.js";

interface CustomRequest extends Request {
  user?: AuthPayload;
}

const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

export const logger = pino({
  level: isProduction ? "info" : "debug",
  ...(isProduction
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }),
});

export const httpLogger = pinoHttp({
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
  customProps: (req: Request, res: Response) => {
    const customReq = req as CustomRequest;
    const user = customReq.user;

    const forwarded = req.headers["x-forwarded-for"];
    const visitorIp =
      typeof forwarded === "string"
        ? forwarded.split(",")[0].trim()
        : req.socket.remoteAddress || "unknown";

    const visitorPort =
      req.headers["x-forwarded-port"] || req.socket.remotePort || "unknown";

    return {
      visitorIp,
      visitorPort,
      deviceProfile: req.headers["user-agent"] || "unknown",
      httpMethod: req.method,
      requestedUrl: req.originalUrl || req.url,
      statusCode: res.statusCode,
      referer: req.headers["referer"] || req.headers["referrer"] || "direct",
      contentLength: res.getHeader("content-length") || "0",
      ...(user && {
        userId: user.userId,
        userRole: user.role,
        userEmail: user.email,
      }),
    };
  },
  customSuccessMessage: (req, res, time) => {
    return `[HIT DETECTED] ${req.method} ${req.originalUrl || req.url} - Status: ${res.statusCode} - ${time}ms`;
  },
  customErrorMessage: (req, res, err) => {
    return `[HIT ERROR] ${req.method} ${req.originalUrl || req.url} - Status: ${res.statusCode} - Error: ${err.message}`;
  },
});

export default logger;

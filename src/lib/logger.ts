import { Request } from "express";
import pino from "pino";
import { pinoHttp } from "pino-http";

// Vercel বা Production এনভায়রনমেন্ট চেক
const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

export const logger = pino({
  level: isProduction ? "info" : "debug",
  // Vercel/Production এ কখনই transport সেট করা হবে না
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
  customProps: (req: Request) => {
    return {
      visitorIp:
        req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
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
});

export default logger;

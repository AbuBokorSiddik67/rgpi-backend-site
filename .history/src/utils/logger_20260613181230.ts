import express, { Application, Request, Response } from "express";

import pino from "pino";
import { pinoHttp } from "pino-http";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: isProduction ? "info" : "debug",
  transport: !isProduction
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
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

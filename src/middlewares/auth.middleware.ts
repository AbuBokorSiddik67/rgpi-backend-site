import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import type { Role } from "../constants/roles.js";
import { prisma } from "../lib/prisma.js";

export interface AuthPayload {
  userId: string;
  role: Role;
  email: string;
  jti: string;
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }

  let decoded: AuthPayload;
  try {
    decoded = jwt.verify(token, env.jwt.secret) as AuthPayload;
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }

  const revoked = await prisma.revokedToken.findUnique({
    where: { jti: decoded.jti },
  });

  if (revoked) {
    return res
      .status(401)
      .json({ success: false, message: "Session expired, please login again" });
  }

  req.user = decoded;
  next();
}

export const authorize =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };

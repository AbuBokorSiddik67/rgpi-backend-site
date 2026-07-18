import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";
import { env } from "../../config/env.js";

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const authController = {

  async register(req: Request, res: Response, next: NextFunction) {
    try {

      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const result = await authService.register(parsed.data);
      const { token, ...data } = result as typeof result & { token: string };

      res.cookie("token", token, cookieOptions);
      res.status(201).json({ success: true, message: "Registration successful", data });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const result = await authService.login(parsed.data);
      const { token, ...data } = result as typeof result & { token: string };

      res.cookie("token", token, cookieOptions);
      res.json({ success: true, message: "Login successful", data });
    } catch (err) {
      next(err);
    }
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie("token", cookieOptions);
    res.json({ success: true, message: "Logged out successfully" });
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.getMe(req.user!.userId as string);
      res.json({ success: true, data: { user } });
    } catch (err) {
      next(err);
    }
  },
};

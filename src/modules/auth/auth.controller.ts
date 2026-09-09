import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service.js';
import { loginSchema, registerSchema } from './auth.validation.js';

import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || 'Validation failed',
        });
      }

      const result = await authService.register(parsed.data);
      const { token, ...data } = result as typeof result & { token: string };

      res.cookie('token', token, cookieOptions);
      res
        .status(201)
        .json({ success: true, message: 'Registration successful', data });
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
          message: parsed.error.issues[0]?.message || 'Validation failed',
        });
      }

      const result = await authService.login(parsed.data);
      const { token, ...data } = result as typeof result & { token: string };

      res.cookie('token', token, cookieOptions);
      res.json({ success: true, message: 'Login successful', data });
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.token;
      if (token) {
        await authService.revokeToken(token);
      }
      res.clearCookie('token', cookieOptions);
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
      next(err);
    }
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

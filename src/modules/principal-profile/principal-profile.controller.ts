import { Request, Response, NextFunction } from "express";
import { principalProfileService } from "./principal-profile.service.js";
import { createPrincipalProfileSchema, updatePrincipalProfileSchema } from "./principal-profile.validation.js";

export const principalProfileController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createPrincipalProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const principalProfile = await principalProfileService.create(parsed.data);
      res.status(201).json({ success: true, message: "PrincipalProfile created", data: principalProfile });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await principalProfileService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const principalProfile = await principalProfileService.findById(req.params.id as string);
      res.json({ success: true, data: principalProfile });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updatePrincipalProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const principalProfile = await principalProfileService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "PrincipalProfile updated", data: principalProfile });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await principalProfileService.remove(req.params.id as string);
      res.json({ success: true, message: "PrincipalProfile deleted" });
    } catch (err) {
      next(err);
    }
  },
};

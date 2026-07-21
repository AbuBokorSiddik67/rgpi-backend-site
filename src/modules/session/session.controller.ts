import { Request, Response, NextFunction } from "express";
import { sessionService } from "./session.service.js";
import { createSessionSchema, updateSessionSchema } from "./session.validation.js";

export const sessionController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createSessionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const session = await sessionService.create(parsed.data);
      res.status(201).json({ success: true, message: "Session created", data: session });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await sessionService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await sessionService.findById(req.params.id as string);
      res.json({ success: true, data: session });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateSessionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const session = await sessionService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Session updated", data: session });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await sessionService.remove(req.params.id as string);
      res.json({ success: true, message: "Session deleted" });
    } catch (err) {
      next(err);
    }
  },
};

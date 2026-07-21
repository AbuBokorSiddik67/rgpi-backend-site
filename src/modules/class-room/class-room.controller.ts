import { Request, Response, NextFunction } from "express";
import { classRoomService } from "./class-room.service.js";
import { createClassRoomSchema, updateClassRoomSchema } from "./class-room.validation.js";

export const classRoomController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createClassRoomSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const classRoom = await classRoomService.create(parsed.data);
      res.status(201).json({ success: true, message: "ClassRoom created", data: classRoom });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await classRoomService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const classRoom = await classRoomService.findById(req.params.id as string);
      res.json({ success: true, data: classRoom });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateClassRoomSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const classRoom = await classRoomService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "ClassRoom updated", data: classRoom });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await classRoomService.remove(req.params.id as string);
      res.json({ success: true, message: "ClassRoom deleted" });
    } catch (err) {
      next(err);
    }
  },
};

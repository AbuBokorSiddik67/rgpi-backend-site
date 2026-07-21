import { Request, Response, NextFunction } from "express";
import { departmentService } from "./department.service.js";
import { createDepartmentSchema, updateDepartmentSchema } from "./department.validation.js";

export const departmentController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createDepartmentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const department = await departmentService.create(parsed.data);
      res.status(201).json({ success: true, message: "Department created", data: department });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await departmentService.findAll(page, limit);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await departmentService.findById(req.params.id as string);
      res.json({ success: true, data: department });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateDepartmentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: parsed.error.issues[0]?.message || "Validation failed",
        });
      }

      const department = await departmentService.update(req.params.id as string, parsed.data);
      res.json({ success: true, message: "Department updated", data: department });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await departmentService.remove(req.params.id as string);
      res.json({ success: true, message: "Department deleted" });
    } catch (err) {
      next(err);
    }
  },
};

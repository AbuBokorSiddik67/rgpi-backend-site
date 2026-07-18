import { Router } from "express";
import { studentController } from "./student.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/auth.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

router.use(authenticate, authorize(ROLES.STUDENT));

/**
 * @openapi
 * /api/v1/students/me:
 *   get:
 *     summary: Get student profile
 *     tags: [Student Portal]
 */
router.get("/me", studentController.getProfile);

/**
 * @openapi
 * /api/v1/students/me/dashboard:
 *   get:
 *     summary: Get student dashboard
 *     tags: [Student Portal]
 */
router.get("/me/dashboard", studentController.getDashboard);

/**
 * @openapi
 * /api/v1/students/me/attendance:
 *   get:
 *     summary: Get student attendance
 *     tags: [Student Portal]
 */
router.get("/me/attendance", studentController.getAttendance);

/**
 * @openapi
 * /api/v1/students/me/notices:
 *   get:
 *     summary: Get student notices
 *     tags: [Student Portal]
 */
router.get("/me/notices", studentController.getNotices);

/**
 * @openapi
 * /api/v1/students/me/careers:
 *   get:
 *     summary: Get career opportunities
 *     tags: [Student Portal]
 */
router.get("/me/careers", studentController.getCareers);

/**
 * @openapi
 * /api/v1/students/me/academics:
 *   get:
 *     summary: Get academic information
 *     tags: [Student Portal]
 */
router.get("/me/academics", studentController.getAcademics);

export const studentRouter = router;

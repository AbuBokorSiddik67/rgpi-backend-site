
/* ─────────────────────────────────────────
   STUDENT
───────────────────────────────────────── */

import { AttendanceStatus, NoticeTarget } from "../../../generated/prisma/enums";

export interface AttendanceQuery {
  subjectId?: string;
}

/* ─────────────────────────────────────────
   TEACHER
───────────────────────────────────────── */

export interface AttendanceEntry {
  studentId: string;
  status: AttendanceStatus;
}

export interface SubmitAttendanceInput {
  attendances: AttendanceEntry[];
  selfStatus?: AttendanceStatus;
}

/* ─────────────────────────────────────────
   ADMIN (CI / PRINCIPAL)
───────────────────────────────────────── */

export interface StudentListQuery {
  departmentId?: string;
  batchId?: string;
  search?: string;
}

export interface TeacherListQuery {
  departmentId?: string;
  search?: string;
}

export interface UpdateStatusInput {
  isSuspended?: boolean;
  isActive?: boolean;
  isAlert?: boolean;
}

export interface CreateNoticeInput {
  title: string;
  body: string;
  target?: NoticeTarget;
}

export interface UpdateNoticeInput {
  title?: string;
  body?: string;
  target?: NoticeTarget;
  isActive?: boolean;
}

import { AttendanceStatus } from "../../../generated/prisma/enums";

export interface CreateTeacherAttendanceInput {
  teacherId: string;
  classSessionId: string;
  status?: AttendanceStatus;
  markedAt?: Date;
}

export interface UpdateTeacherAttendanceInput {
  teacherId?: string;
  classSessionId?: string;
  status?: AttendanceStatus;
  markedAt?: Date;
}

export interface TeacherAttendanceQueryParams {
  page?: number;
  limit?: number;
}

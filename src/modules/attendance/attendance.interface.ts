import { AttendanceStatus } from "../../constants/constants";

export interface CreateAttendanceInput {
  studentId: string;
  classSessionId: string;
  status?: AttendanceStatus;
  markedAt?: Date;
}

export interface UpdateAttendanceInput {
  studentId?: string;
  classSessionId?: string;
  status?: AttendanceStatus;
  markedAt?: Date;
}

export interface AttendanceQueryParams {
  page?: number;
  limit?: number;
}

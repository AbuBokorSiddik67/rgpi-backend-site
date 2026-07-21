import { AttendanceStatus } from "../../constants/constants";

export interface CreateAttendanceInput {
  studentId: string;
  classSessionId: string;
  status?: AttendanceStatus;
  markedAt?: string;
}

export interface UpdateAttendanceInput {
  studentId?: string;
  classSessionId?: string;
  status?: AttendanceStatus;
  markedAt?: string;
}

export interface AttendanceQueryParams {
  page?: number;
  limit?: number;
}

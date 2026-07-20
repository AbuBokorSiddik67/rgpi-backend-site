export interface CreateTeacherAttendanceInput {
  teacherId: string;
  classSessionId: string;
  status?: AttendanceStatus;
  markedAt?: string;
}

export interface UpdateTeacherAttendanceInput {
  teacherId?: string;
  classSessionId?: string;
  status?: AttendanceStatus;
  markedAt?: string;
}

export interface TeacherAttendanceQueryParams {
  page?: number;
  limit?: number;
}

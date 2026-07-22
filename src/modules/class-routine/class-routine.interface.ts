import { ClassType, DayOfWeek } from "@prisma/client";

export interface CreateClassRoutineInput {
  departmentId: string;
  batchId: string;
  semesterId: string;
  subjectId: string;
  teacherId: string;
  classRoomId: string;
  periodId: string;
  dayOfWeek: DayOfWeek;
  classType: ClassType;
}

export interface UpdateClassRoutineInput {
  departmentId?: string;
  batchId?: string;
  semesterId?: string;
  subjectId?: string;
  teacherId?: string;
  classRoomId?: string;
  periodId?: string;
  dayOfWeek?: DayOfWeek;
  classType?: ClassType;
}

export interface ClassRoutineQueryParams {
  page?: number;
  limit?: number;
}

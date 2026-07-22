import { ClassStatus } from "@prisma/client";

export interface CreateClassSessionInput {
  routineId: string;
  teacherId: string;
  date: Date;
  status?: ClassStatus;
}

export interface UpdateClassSessionInput {
  routineId?: string;
  teacherId?: string;
  date?: Date;
  status?: ClassStatus;
}

export interface ClassSessionQueryParams {
  page?: number;
  limit?: number;
}

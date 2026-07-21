export interface CreateClassSessionInput {
  routineId: string;
  teacherId: string;
  date: string;
  status?: ClassStatus;
}

export interface UpdateClassSessionInput {
  routineId?: string;
  teacherId?: string;
  date?: string;
  status?: ClassStatus;
}

export interface ClassSessionQueryParams {
  page?: number;
  limit?: number;
}

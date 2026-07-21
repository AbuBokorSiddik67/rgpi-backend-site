export interface CreateSemesterInput {
  semesterNumber: number;
  classLoad?: number;
  startDate?: Date;
}

export interface UpdateSemesterInput {
  semesterNumber?: number;
  classLoad?: number;
  startDate?: Date;
}

export interface SemesterQueryParams {
  page?: number;
  limit?: number;
}

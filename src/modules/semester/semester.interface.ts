export interface CreateSemesterInput {
  semesterNumber: number;
  classLoad?: number;
  startDate?: string;
}

export interface UpdateSemesterInput {
  semesterNumber?: number;
  classLoad?: number;
  startDate?: string;
}

export interface SemesterQueryParams {
  page?: number;
  limit?: number;
}

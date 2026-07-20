export interface CreateDepartmentInput {
  instituteId: string;
  dptName: string;
}

export interface UpdateDepartmentInput {
  instituteId?: string;
  dptName?: string;
}

export interface DepartmentQueryParams {
  page?: number;
  limit?: number;
}

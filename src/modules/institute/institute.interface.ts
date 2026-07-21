export interface CreateInstituteInput {
  name: string;
  address?: string;
  logo?: string;
}

export interface UpdateInstituteInput {
  name?: string;
  address?: string;
  logo?: string;
}

export interface InstituteQueryParams {
  page?: number;
  limit?: number;
}

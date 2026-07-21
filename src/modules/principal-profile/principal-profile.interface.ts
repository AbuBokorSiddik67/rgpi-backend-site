export interface CreatePrincipalProfileInput {
  userId: string;
  profilePicture?: string;
  superAdminName: string;
  joiningDate?: Date;
  leavingDate?: Date;
  pastInstituteName?: string;
}

export interface UpdatePrincipalProfileInput {
  userId?: string;
  profilePicture?: string;
  superAdminName?: string;
  joiningDate?: Date;
  leavingDate?: Date;
  pastInstituteName?: string;
}

export interface PrincipalProfileQueryParams {
  page?: number;
  limit?: number;
}

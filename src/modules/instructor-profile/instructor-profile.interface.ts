export interface CreateInstructorProfileInput {
  userId: string;
  profilePicture?: string;
  adminName: string;
  acronym?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  joiningDate?: Date;
  leavingDate?: Date;
  position?: string;
  departmentId: string;
  isSuspended?: boolean;
  isAlert?: boolean;
}

export interface UpdateInstructorProfileInput {
  userId?: string;
  profilePicture?: string;
  adminName?: string;
  acronym?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  joiningDate?: Date;
  leavingDate?: Date;
  position?: string;
  departmentId?: string;
  isSuspended?: boolean;
  isAlert?: boolean;
}

export interface InstructorProfileQueryParams {
  page?: number;
  limit?: number;
}

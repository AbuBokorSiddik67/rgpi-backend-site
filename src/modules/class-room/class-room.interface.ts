export interface CreateClassRoomInput {
  classRoomNumber: string;
  departmentId: string;
}

export interface UpdateClassRoomInput {
  classRoomNumber?: string;
  departmentId?: string;
}

export interface ClassRoomQueryParams {
  page?: number;
  limit?: number;
}

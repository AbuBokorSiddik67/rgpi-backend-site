export interface CreateShiftInput {
  shiftNumber: number;
}

export interface UpdateShiftInput {
  shiftNumber?: number;
}

export interface ShiftQueryParams {
  page?: number;
  limit?: number;
}

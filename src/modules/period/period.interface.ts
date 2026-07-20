export interface CreatePeriodInput {
  periodNumber: number;
  startTime: string;
  endTime: string;
  shiftId: string;
}

export interface UpdatePeriodInput {
  periodNumber?: number;
  startTime?: string;
  endTime?: string;
  shiftId?: string;
}

export interface PeriodQueryParams {
  page?: number;
  limit?: number;
}

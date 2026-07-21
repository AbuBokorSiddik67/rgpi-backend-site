export interface CreateBatchInput {
  batchName: string;
  departmentId: string;
  semesterId: string;
  shiftId: string;
  sessionId: string;
}

export interface UpdateBatchInput {
  batchName?: string;
  departmentId?: string;
  semesterId?: string;
  shiftId?: string;
  sessionId?: string;
}

export interface BatchQueryParams {
  page?: number;
  limit?: number;
}

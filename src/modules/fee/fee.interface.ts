export interface CreateFeeInput {
  studentId: string;
  amount: number;
  status?: FeeStatus;
  dueDate: string;
  paidAt?: string;
  remark?: string;
}

export interface UpdateFeeInput {
  studentId?: string;
  amount?: number;
  status?: FeeStatus;
  dueDate?: string;
  paidAt?: string;
  remark?: string;
}

export interface FeeQueryParams {
  page?: number;
  limit?: number;
}

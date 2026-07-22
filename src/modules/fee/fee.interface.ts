import { FeeStatus } from "@prisma/client";

export interface CreateFeeInput {
  studentId: string;
  amount: number;
  status?: FeeStatus;
  dueDate: Date;
  paidAt?: Date;
  remark?: string;
}

export interface UpdateFeeInput {
  studentId?: string;
  amount?: number;
  status?: FeeStatus;
  dueDate?: Date;
  paidAt?: Date;
  remark?: string;
}

export interface FeeQueryParams {
  page?: number;
  limit?: number;
}

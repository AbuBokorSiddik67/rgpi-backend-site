import { NoticeTarget } from "@prisma/client";

export interface CreateNoticeInput {
  title: string;
  body: string;
  target?: NoticeTarget;
  publishedAt?: Date;
}

export interface UpdateNoticeInput {
  title?: string;
  body?: string;
  target?: NoticeTarget;
  publishedAt?: Date;
}

export interface NoticeQueryParams {
  page?: number;
  limit?: number;
}

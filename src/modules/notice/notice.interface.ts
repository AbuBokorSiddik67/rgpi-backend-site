import { NoticeTarget } from "../../../generated/prisma/enums";

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

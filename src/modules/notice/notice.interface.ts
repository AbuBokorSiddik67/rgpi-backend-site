export interface CreateNoticeInput {
  title: string;
  body: string;
  target?: NoticeTarget;
  publishedAt?: string;
}

export interface UpdateNoticeInput {
  title?: string;
  body?: string;
  target?: NoticeTarget;
  publishedAt?: string;
}

export interface NoticeQueryParams {
  page?: number;
  limit?: number;
}

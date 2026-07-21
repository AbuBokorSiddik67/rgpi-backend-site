export interface CreateSessionInput {
  sessionYear: string;
}

export interface UpdateSessionInput {
  sessionYear?: string;
}

export interface SessionQueryParams {
  page?: number;
  limit?: number;
}

export interface CreateResultInput {
  studentId: string;
  subjectId: string;
  semesterId: string;
  contTheory?: number;
  finalTheory?: number;
  contPractical?: number;
  finalPractical?: number;
  totalMarks?: number;
  grade?: string;
  gpa?: number;
  isPublished?: boolean;
}

export interface UpdateResultInput {
  studentId?: string;
  subjectId?: string;
  semesterId?: string;
  contTheory?: number;
  finalTheory?: number;
  contPractical?: number;
  finalPractical?: number;
  totalMarks?: number;
  grade?: string;
  gpa?: number;
  isPublished?: boolean;
}

export interface ResultQueryParams {
  page?: number;
  limit?: number;
}

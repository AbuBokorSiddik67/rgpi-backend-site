export interface CreateSubjectInput {
  subjectName: string;
  subjectCode: string;
  credit: number;
  theoryClass: number;
  practicalClass: number;
  contTheory?: number;
  finalTheory?: number;
  contPractical?: number;
  finalPractical?: number;
  grandTotal: number;
  departmentId: string;
  semesterId: string;
}

export interface UpdateSubjectInput {
  subjectName?: string;
  subjectCode?: string;
  credit?: number;
  theoryClass?: number;
  practicalClass?: number;
  contTheory?: number;
  finalTheory?: number;
  contPractical?: number;
  finalPractical?: number;
  grandTotal?: number;
  departmentId?: string;
  semesterId?: string;
}

export interface SubjectQueryParams {
  page?: number;
  limit?: number;
}

import { Gender } from "../../constants/constants.js";

export interface CreateStudentProfileInput {
  userId: string;
  roll: string;
  registration?: string;
  profilePicture?: string;
  studentName: string;
  fatherName?: string;
  motherName?: string;
  birthIdNo?: string;
  nidNo?: string;
  fatherNidNo?: string;
  motherNidNo?: string;
  address?: string;
  gender?: Gender;
  batchId: string;
  isStripend?: boolean;
  isSuspended?: boolean;
  isAlert?: boolean;
}

export interface UpdateStudentProfileInput {
  userId?: string;
  roll?: string;
  registration?: string;
  profilePicture?: string;
  studentName?: string;
  fatherName?: string;
  motherName?: string;
  birthIdNo?: string;
  nidNo?: string;
  fatherNidNo?: string;
  motherNidNo?: string;
  address?: string;
  gender?: Gender;
  batchId?: string;
  isStripend?: boolean;
  isSuspended?: boolean;
  isAlert?: boolean;
}

export interface StudentProfileQueryParams {
  page?: number;
  limit?: number;
}

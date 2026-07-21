export const ROLES = {
  STUDENT: "STUDENT",
  INSTRUCTOR: "INSTRUCTOR",
  CI: "CI",
  PRINCIPAL: "PRINCIPAL",
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  LATE: "LATE",
} as const;

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

export const ClassStatus = {
  HELD: "HELD",
  CANCELLED: "CANCELLED",
  SUCCESSFULL: "SUCCESSFULL",
} as const;

export const DayOfWeek = {
  SUN: "SUN",
  MON: "MON",
  TUE: "TUE",
  WED: "WED",
  THU: "THU",
} as const;

export const ClassType = {
  THEORY: "THEORY",
  PRACTICAL: "PRACTICAL",
} as const;

export const FeeStatus = {
  PAID: "PAID",
  UNPAID: "UNPAID",
  PARTIAL: "PARTIAL",
} as const;

export const NoticeTarget = {
  ALL: "ALL",
  STUDENT: "STUDENT",
  INSTRUCTOR: "INSTRUCTOR",
  PRINCIPAL: "PRINCIPAL",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type AttendanceStatus =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];
export type Gender = (typeof Gender)[keyof typeof Gender];
export type ClassStatus = (typeof ClassStatus)[keyof typeof ClassStatus];
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];
export type ClassType = (typeof ClassType)[keyof typeof ClassType];
export type FeeStatus = (typeof FeeStatus)[keyof typeof FeeStatus];
export type NoticeTarget = (typeof NoticeTarget)[keyof typeof NoticeTarget];

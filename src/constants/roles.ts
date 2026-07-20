export const ROLES = {
  STUDENT: "STUDENT",
  INSTRUCTOR: "INSTRUCTOR",
  CI: "CI",
  PRINCIPAL: "PRINCIPAL",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

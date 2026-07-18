import { prisma } from "../../lib/prisma.js";
import type {
  StudentProfile,
  DashboardData,
  AttendanceSummary,
  NoticeItem,
  CareerItem,
  AcademicInfo,
} from "./student.interface.js";
import type { AttendanceQuery } from "./student.validation.js";

const SUBJECTS_BY_SEMESTER: Record<
  string,
  Array<{ code: string; name: string; credit: number; type: string }>
> = {
  "1": [
    { code: "MAT-101", name: "Mathematics-I", credit: 3, type: "Theory" },
    { code: "PHY-101", name: "Physics", credit: 3, type: "Theory" },
    { code: "ENG-101", name: "English", credit: 2, type: "Theory" },
    { code: "CMP-101", name: "Computer Fundamentals", credit: 3, type: "Theory" },
    { code: "CMP-102", name: "Computer Lab", credit: 2, type: "Lab" },
  ],
  "2": [
    { code: "MAT-201", name: "Mathematics-II", credit: 3, type: "Theory" },
    { code: "CMP-201", name: "Programming in C", credit: 3, type: "Theory" },
    { code: "CMP-202", name: "C Programming Lab", credit: 2, type: "Lab" },
    { code: "ELC-201", name: "Basic Electronics", credit: 3, type: "Theory" },
  ],
  default: [
    { code: "PRO-301", name: "Project Work", credit: 4, type: "Practical" },
    { code: "IND-301", name: "Industrial Training", credit: 3, type: "Practical" },
    { code: "MGT-301", name: "Management", credit: 2, type: "Theory" },
  ],
};

const ROUTINE_TEMPLATE = [
  {
    day: "Sunday",
    periods: [
      { time: "08:30 - 09:20", subject: "Theory Class", teacher: "—", room: "Room 101" },
      { time: "09:25 - 10:15", subject: "Theory Class", teacher: "—", room: "Room 101" },
      { time: "10:30 - 12:00", subject: "Lab Session", teacher: "—", room: "Lab 2" },
    ],
  },
  {
    day: "Monday",
    periods: [
      { time: "08:30 - 09:20", subject: "Theory Class", teacher: "—", room: "Room 102" },
      { time: "09:25 - 10:15", subject: "Theory Class", teacher: "—", room: "Room 102" },
      { time: "10:30 - 11:20", subject: "Tutorial", teacher: "—", room: "Room 103" },
    ],
  },
  {
    day: "Tuesday",
    periods: [
      { time: "08:30 - 10:15", subject: "Lab Session", teacher: "—", room: "Lab 1" },
      { time: "10:30 - 12:00", subject: "Theory Class", teacher: "—", room: "Room 101" },
    ],
  },
  {
    day: "Wednesday",
    periods: [
      { time: "08:30 - 09:20", subject: "Theory Class", teacher: "—", room: "Room 104" },
      { time: "09:25 - 10:15", subject: "Theory Class", teacher: "—", room: "Room 104" },
    ],
  },
  {
    day: "Thursday",
    periods: [
      { time: "08:30 - 10:15", subject: "Lab Session", teacher: "—", room: "Lab 3" },
      { time: "10:30 - 11:20", subject: "Seminar", teacher: "—", room: "Seminar Hall" },
    ],
  },
];

async function getStudentByUserId(userId: number) {
  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
        },
      },
      department: true,
    },
  });

  if (!student) {
    throw Object.assign(new Error("Student profile not found"), { status: 404 });
  }

  return student;
}

function calcAttendanceStats(
  records: Array<{ status: string }>,
): Omit<AttendanceSummary, "records"> {
  const total = records.length;
  const present = records.filter((r) => r.status === "PRESENT").length;
  const absent = records.filter((r) => r.status === "ABSENT").length;
  const late = records.filter((r) => r.status === "LATE").length;
  const excused = records.filter((r) => r.status === "EXCUSED").length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return { total, present, absent, late, excused, percentage };
}

export const studentService = {
  async getProfile(userId: number): Promise<StudentProfile> {
    const student = await getStudentByUserId(userId);

    return {
      id: student.id,
      rollNumber: student.rollNumber,
      semester: student.semester,
      session: student.session,
      bloodGroup: student.bloodGroup,
      dateOfBirth: student.dateOfBirth?.toISOString() ?? null,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
      address: student.address,
      admissionDate: student.admissionDate?.toISOString() ?? null,
      user: student.user,
      department: {
        id: student.department.id,
        name: student.department.name,
        code: student.department.code,
        description: student.department.description,
      },
    };
  },

  async getDashboard(userId: number): Promise<DashboardData> {
    const student = await getStudentByUserId(userId);

    const attendances = await prisma.attendance.findMany({
      where: { studentId: student.id },
    });
    const stats = calcAttendanceStats(attendances);

    const recentNotices = await prisma.notice.findMany({
      where: {
        isActive: true,
        OR: [
          { departmentId: student.departmentId },
          { departmentId: null },
        ],
      },
      orderBy: { publishedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        type: true,
        publishedAt: true,
      },
    });

    const upcomingCareers = await prisma.career.findMany({
      where: {
        isActive: true,
        OR: [
          { departmentId: student.departmentId },
          { departmentId: null },
        ],
      },
      orderBy: { deadline: "asc" },
      take: 5,
      select: {
        id: true,
        title: true,
        company: true,
        type: true,
        deadline: true,
      },
    });

    return {
      profile: {
        name: student.user.name,
        rollNumber: student.rollNumber,
        department: student.department.name,
        semester: student.semester,
        session: student.session,
      },
      attendance: {
        total: stats.total,
        present: stats.present,
        absent: stats.absent,
        late: stats.late,
        percentage: stats.percentage,
      },
      recentNotices: recentNotices.map((n) => ({
        ...n,
        publishedAt: n.publishedAt.toISOString(),
      })),
      upcomingCareers: upcomingCareers.map((c) => ({
        ...c,
        type: c.type,
        deadline: c.deadline?.toISOString() ?? null,
      })),
    };
  },

  async getAttendance(
    userId: number,
    query: AttendanceQuery,
  ): Promise<AttendanceSummary> {
    const student = await getStudentByUserId(userId);

    const now = new Date();
    const month = query.month ?? now.getMonth() + 1;
    const year = query.year ?? now.getFullYear();

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const records = await prisma.attendance.findMany({
      where: {
        studentId: student.id,
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: "desc" },
    });

    const stats = calcAttendanceStats(records);

    return {
      ...stats,
      records: records.map((r) => ({
        id: r.id,
        date: r.date.toISOString().split("T")[0],
        status: r.status,
        subject: r.subject,
        remark: r.remark,
      })),
    };
  },

  async getNotices(userId: number): Promise<NoticeItem[]> {
    const student = await getStudentByUserId(userId);

    const notices = await prisma.notice.findMany({
      where: {
        isActive: true,
        OR: [
          { departmentId: student.departmentId },
          { departmentId: null },
        ],
      },
      include: {
        department: { select: { name: true, code: true } },
      },
      orderBy: { publishedAt: "desc" },
    });

    return notices.map((n) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      type: n.type,
      publishedAt: n.publishedAt.toISOString(),
      expiresAt: n.expiresAt?.toISOString() ?? null,
      department: n.department,
    }));
  },

  async getCareers(userId: number): Promise<CareerItem[]> {
    const student = await getStudentByUserId(userId);

    const careers = await prisma.career.findMany({
      where: {
        isActive: true,
        OR: [
          { departmentId: student.departmentId },
          { departmentId: null },
        ],
      },
      include: {
        department: { select: { name: true, code: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return careers.map((c) => ({
      id: c.id,
      title: c.title,
      company: c.company,
      description: c.description,
      type: c.type,
      location: c.location,
      salary: c.salary,
      deadline: c.deadline?.toISOString() ?? null,
      department: c.department,
    }));
  },

  async getAcademics(userId: number): Promise<AcademicInfo> {
    const student = await getStudentByUserId(userId);
    const semesterKey = String(student.semester);
    const subjects =
      SUBJECTS_BY_SEMESTER[semesterKey] ?? SUBJECTS_BY_SEMESTER.default;

    return {
      rollNumber: student.rollNumber,
      semester: student.semester,
      session: student.session,
      department: {
        name: student.department.name,
        code: student.department.code,
        description: student.department.description,
      },
      subjects,
      routine: ROUTINE_TEMPLATE,
    };
  },
};

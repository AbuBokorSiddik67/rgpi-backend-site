import { DayOfWeek } from "../../constants/constants.js";
import { prisma } from "../../lib/prisma.js";
import type {
  AttendanceQuery,
  StudentListQuery,
  TeacherListQuery,
  SubmitAttendanceInput,
  UpdateStatusInput,
  CreateNoticeInput,
  UpdateNoticeInput,
} from "./dashboard.interface.js";

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */

// JS getDay(): 0=Sun...6=Sat. Schema only has SUN-THU (Bangladesh work week).
const DAY_MAP: Record<number, DayOfWeek | null> = {
  0: DayOfWeek.SUN,
  1: DayOfWeek.MON,
  2: DayOfWeek.TUE,
  3: DayOfWeek.WED,
  4: DayOfWeek.THU,
  5: null, // FRI - weekend
  6: null, // SAT - weekend
};

function todayDayOfWeek(): DayOfWeek | null {
  return DAY_MAP[new Date().getDay()];
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfToday(): Date {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

function attendancePercentage(present: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((present / total) * 10000) / 100; // 2 decimal places
}

async function getStudentProfileOrThrow(userId: string) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    throw Object.assign(new Error("Student profile not found"), { status: 404 });
  }
  return profile;
}

async function getInstructorProfileOrThrow(userId: string) {
  const profile = await prisma.instructorProfile.findUnique({ where: { userId } });
  if (!profile) {
    throw Object.assign(new Error("Instructor profile not found"), { status: 404 });
  }
  return profile;
}

/* ─────────────────────────────────────────
   STUDENT
───────────────────────────────────────── */

async function getStudentOverview(userId: string) {
  const student = await prisma.studentProfile.findUnique({
    where: { userId },
    include: {
      user: { select: { email: true, phone: true, role: true } },
      batch: { include: { department: true, semester: true, shift: true, session: true } },
    },
  });

  if (!student) {
    throw Object.assign(new Error("Student profile not found"), { status: 404 });
  }

  const today = todayDayOfWeek();

  const [runningSubjects, attendanceCounts, todayRoutine, unpaidFees, notices] = await Promise.all([
    prisma.subject.findMany({
      where: {
        departmentId: student.batch.departmentId,
        semesterId: student.batch.semesterId,
        isActive: true,
      },
      orderBy: { subjectName: "asc" },
    }),
    prisma.attendance.groupBy({
      by: ["status"],
      where: { studentId: student.id },
      _count: { status: true },
    }),
    today
      ? prisma.classRoutine.findMany({
          where: { batchId: student.batchId, dayOfWeek: today, isActive: true },
          include: {
            subject: true,
            teacher: { select: { adminName: true, acronym: true } },
            period: true,
            classRoom: true,
          },
          orderBy: { period: { periodNumber: "asc" } },
        })
      : Promise.resolve([]),
    prisma.fee.findMany({
      where: { studentId: student.id, status: { in: ["UNPAID", "PARTIAL"] } },
      orderBy: { dueDate: "asc" },
    }),
    prisma.notice.findMany({
      where: { isActive: true, target: { in: ["ALL", "STUDENT"] } },
      orderBy: { publishedAt: "desc" },
      take: 10,
    }),
  ]);

  const totalMarked = attendanceCounts.reduce((sum, c) => sum + c._count.status, 0);
  const presentCount = attendanceCounts.find((c) => c.status === "PRESENT")?._count.status || 0;
  const lateCount = attendanceCounts.find((c) => c.status === "LATE")?._count.status || 0;
  const absentCount = attendanceCounts.find((c) => c.status === "ABSENT")?._count.status || 0;

  return {
    profile: {
      id: student.id,
      name: student.studentName,
      roll: student.roll,
      registration: student.registration,
      profilePicture: student.profilePicture,
      gender: student.gender,
      email: student.user.email,
      phone: student.user.phone,
      isStripend: student.isStripend,
      isSuspended: student.isSuspended,
    },
    batch: {
      id: student.batch.id,
      batchName: student.batch.batchName,
      department: student.batch.department.dptName,
      semester: student.batch.semester.semesterNumber,
      shift: student.batch.shift.shiftNumber,
      session: student.batch.session.sessionYear,
    },
    runningSubjects,
    attendance: {
      present: presentCount,
      late: lateCount,
      absent: absentCount,
      totalMarked,
      percentage: attendancePercentage(presentCount + lateCount, totalMarked),
    },
    todayRoutine,
    unpaidFees,
    notices,
  };
}

async function getStudentAttendance(userId: string, query: AttendanceQuery) {
  const student = await getStudentProfileOrThrow(userId);

  return prisma.attendance.findMany({
    where: {
      studentId: student.id,
      ...(query.subjectId
        ? { classSession: { routine: { subjectId: query.subjectId } } }
        : {}),
    },
    include: {
      classSession: { include: { routine: { include: { subject: true, period: true } } } },
    },
    orderBy: { markedAt: "desc" },
  });
}

async function getStudentRoutine(userId: string) {
  const student = await getStudentProfileOrThrow(userId);

  return prisma.classRoutine.findMany({
    where: { batchId: student.batchId, isActive: true },
    include: {
      subject: true,
      teacher: { select: { adminName: true, acronym: true } },
      period: true,
      classRoom: true,
    },
    orderBy: [{ dayOfWeek: "asc" }, { period: { periodNumber: "asc" } }],
  });
}

async function getStudentResults(userId: string) {
  const student = await getStudentProfileOrThrow(userId);

  return prisma.result.findMany({
    where: { studentId: student.id, isPublished: true },
    include: { subject: true, semester: true },
    orderBy: [{ semester: { semesterNumber: "asc" } }],
  });
}

/* ─────────────────────────────────────────
   TEACHER (INSTRUCTOR)
───────────────────────────────────────── */

async function getTeacherOverview(userId: string) {
  const teacher = await prisma.instructorProfile.findUnique({
    where: { userId },
    include: { user: { select: { email: true, phone: true } }, department: true },
  });

  if (!teacher) {
    throw Object.assign(new Error("Instructor profile not found"), { status: 404 });
  }

  const today = todayDayOfWeek();

  const [todayRoutines, ownAttendanceCounts, notices] = await Promise.all([
    today
      ? prisma.classRoutine.findMany({
          where: { teacherId: teacher.id, dayOfWeek: today, isActive: true },
          include: {
            subject: true,
            batch: { include: { department: true, semester: true, shift: true } },
            period: true,
            classRoom: true,
          },
          orderBy: { period: { periodNumber: "asc" } },
        })
      : Promise.resolve([]),
    prisma.teacherAttendance.groupBy({
      by: ["status"],
      where: { teacherId: teacher.id },
      _count: { status: true },
    }),
    prisma.notice.findMany({
      where: { isActive: true, target: { in: ["ALL", "INSTRUCTOR"] } },
      orderBy: { publishedAt: "desc" },
      take: 10,
    }),
  ]);

  const todaySessions = await Promise.all(
    todayRoutines.map(async (routine) => {
      let session = await prisma.classSession.findFirst({
        where: { routineId: routine.id, date: { gte: startOfToday(), lte: endOfToday() } },
      });

      if (!session) {
        session = await prisma.classSession.create({
          data: { routineId: routine.id, teacherId: teacher.id, date: new Date() },
        });
      }

      return {
        sessionId: session.id,
        sessionStatus: session.status,
        routineId: routine.id,
        subject: routine.subject.subjectName,
        classType: routine.classType,
        period: `${routine.period.periodNumber} (${routine.period.startTime} - ${routine.period.endTime})`,
        batch: routine.batch.batchName,
        department: routine.batch.department.dptName,
        semester: routine.batch.semester.semesterNumber,
        shift: routine.batch.shift.shiftNumber,
        classRoom: routine.classRoom.classRoomNumber,
      };
    }),
  );

  const totalMarked = ownAttendanceCounts.reduce((sum, c) => sum + c._count.status, 0);
  const presentCount = ownAttendanceCounts.find((c) => c.status === "PRESENT")?._count.status || 0;

  return {
    profile: {
      id: teacher.id,
      name: teacher.adminName,
      acronym: teacher.acronym,
      position: teacher.position,
      department: teacher.department.dptName,
      profilePicture: teacher.profilePicture,
      email: teacher.user.email,
      phone: teacher.user.phone,
      isSuspended: teacher.isSuspended,
    },
    ownAttendance: {
      present: presentCount,
      totalMarked,
      percentage: attendancePercentage(presentCount, totalMarked),
    },
    todayClasses: todaySessions,
    notices,
  };
}

async function getTeacherRoutine(userId: string) {
  const teacher = await getInstructorProfileOrThrow(userId);

  return prisma.classRoutine.findMany({
    where: { teacherId: teacher.id, isActive: true },
    include: {
      subject: true,
      batch: { include: { department: true, semester: true, shift: true } },
      period: true,
      classRoom: true,
    },
    orderBy: [{ dayOfWeek: "asc" }, { period: { periodNumber: "asc" } }],
  });
}

async function getSessionStudents(userId: string, sessionId: string) {
  const teacher = await getInstructorProfileOrThrow(userId);

  const session = await prisma.classSession.findUnique({
    where: { id: sessionId },
    include: { routine: { include: { batch: true, subject: true, period: true } } },
  });

  if (!session) {
    throw Object.assign(new Error("Session not found"), { status: 404 });
  }
  if (session.teacherId !== teacher.id) {
    throw Object.assign(new Error("Not your class session"), { status: 403 });
  }

  const [students, existingAttendance] = await Promise.all([
    prisma.studentProfile.findMany({
      where: { batchId: session.routine.batchId, isActive: true },
      select: { id: true, roll: true, studentName: true, profilePicture: true },
      orderBy: { roll: "asc" },
    }),
    prisma.attendance.findMany({ where: { classSessionId: sessionId } }),
  ]);

  const attendanceMap = new Map(existingAttendance.map((a) => [a.studentId, a.status]));

  return {
    session: {
      id: session.id,
      date: session.date,
      status: session.status,
      subject: session.routine.subject.subjectName,
      period: session.routine.period.periodNumber,
    },
    students: students.map((s) => ({ ...s, status: attendanceMap.get(s.id) || null })),
  };
}

async function submitAttendance(userId: string, sessionId: string, input: SubmitAttendanceInput) {
  const teacher = await getInstructorProfileOrThrow(userId);

  const session = await prisma.classSession.findUnique({ where: { id: sessionId } });
  if (!session) {
    throw Object.assign(new Error("Session not found"), { status: 404 });
  }
  if (session.teacherId !== teacher.id) {
    throw Object.assign(new Error("Not your class session"), { status: 403 });
  }

  // Make sure every studentId actually belongs to this session's batch — prevents
  // cross-batch attendance being submitted by mistake (foreign-key-level check).
  const routine = await prisma.classRoutine.findUnique({ where: { id: session.routineId } });
  const validStudentIds = new Set(
    (
      await prisma.studentProfile.findMany({
        where: { batchId: routine!.batchId },
        select: { id: true },
      })
    ).map((s) => s.id),
  );

  const invalidIds = input.attendances.filter((a) => !validStudentIds.has(a.studentId));
  if (invalidIds.length > 0) {
    throw Object.assign(new Error("One or more studentId values do not belong to this class"), {
      status: 400,
    });
  }

  await prisma.$transaction([
    ...input.attendances.map((a) =>
      prisma.attendance.upsert({
        where: { studentId_classSessionId: { studentId: a.studentId, classSessionId: sessionId } },
        update: { status: a.status, markedAt: new Date() },
        create: { studentId: a.studentId, classSessionId: sessionId, status: a.status },
      }),
    ),
    prisma.teacherAttendance.upsert({
      where: { teacherId_classSessionId: { teacherId: teacher.id, classSessionId: sessionId } },
      update: { status: input.selfStatus || "PRESENT", markedAt: new Date() },
      create: {
        teacherId: teacher.id,
        classSessionId: sessionId,
        status: input.selfStatus || "PRESENT",
      },
    }),
    prisma.classSession.update({ where: { id: sessionId }, data: { status: "HELD" } }),
  ]);
}

/* ─────────────────────────────────────────
   ADMIN (CI / PRINCIPAL)
───────────────────────────────────────── */

async function getAdminOverview() {
  const today = todayDayOfWeek();

  const [
    totalStudents,
    totalTeachers,
    totalDepartments,
    totalBatches,
    suspendedStudents,
    suspendedTeachers,
    todaySessionsCount,
    unpaidFeesAgg,
    recentNotices,
    attendanceToday,
  ] = await Promise.all([
    prisma.studentProfile.count({ where: { isActive: true } }),
    prisma.instructorProfile.count({ where: { isActive: true } }),
    prisma.department.count({ where: { isActive: true } }),
    prisma.batch.count({ where: { isActive: true } }),
    prisma.studentProfile.count({ where: { isSuspended: true } }),
    prisma.instructorProfile.count({ where: { isSuspended: true } }),
    today
      ? prisma.classRoutine.count({ where: { dayOfWeek: today, isActive: true } })
      : Promise.resolve(0),
    prisma.fee.aggregate({
      where: { status: { in: ["UNPAID", "PARTIAL"] } },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.notice.findMany({ orderBy: { publishedAt: "desc" }, take: 10 }),
    prisma.attendance.groupBy({
      by: ["status"],
      where: { classSession: { date: { gte: startOfToday(), lte: endOfToday() } } },
      _count: { status: true },
    }),
  ]);

  return {
    counts: {
      students: totalStudents,
      teachers: totalTeachers,
      departments: totalDepartments,
      batches: totalBatches,
      suspendedStudents,
      suspendedTeachers,
    },
    todaySessionsScheduled: todaySessionsCount,
    fees: {
      outstandingCount: unpaidFeesAgg._count,
      outstandingAmount: unpaidFeesAgg._sum.amount || 0,
    },
    todayAttendance: attendanceToday.reduce(
      (acc, c) => ({ ...acc, [c.status]: c._count.status }),
      {} as Record<string, number>,
    ),
    recentNotices,
  };
}

async function getDepartments() {
  return prisma.department.findMany({
    include: { _count: { select: { instructors: true, batches: true, subjects: true } } },
    orderBy: { dptName: "asc" },
  });
}

async function getStudentsList(query: StudentListQuery) {
  // If a departmentId is supplied, make sure it actually exists — avoids a
  // silently-empty result set when the caller passes a typo'd/foreign id.
  if (query.departmentId) {
    const dept = await prisma.department.findUnique({ where: { id: query.departmentId } });
    if (!dept) {
      throw Object.assign(new Error("Invalid departmentId"), { status: 400 });
    }
  }
  if (query.batchId) {
    const batch = await prisma.batch.findUnique({ where: { id: query.batchId } });
    if (!batch) {
      throw Object.assign(new Error("Invalid batchId"), { status: 400 });
    }
  }

  return prisma.studentProfile.findMany({
    where: {
      ...(query.batchId ? { batchId: query.batchId } : {}),
      ...(query.departmentId ? { batch: { departmentId: query.departmentId } } : {}),
      ...(query.search
        ? {
            OR: [
              { studentName: { contains: query.search, mode: "insensitive" } },
              { roll: { contains: query.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { batch: { include: { department: true } }, user: { select: { email: true } } },
    orderBy: { studentName: "asc" },
  });
}

async function getTeachersList(query: TeacherListQuery) {
  if (query.departmentId) {
    const dept = await prisma.department.findUnique({ where: { id: query.departmentId } });
    if (!dept) {
      throw Object.assign(new Error("Invalid departmentId"), { status: 400 });
    }
  }

  return prisma.instructorProfile.findMany({
    where: {
      ...(query.departmentId ? { departmentId: query.departmentId } : {}),
      ...(query.search ? { adminName: { contains: query.search, mode: "insensitive" } } : {}),
    },
    include: { department: true, user: { select: { email: true } } },
    orderBy: { adminName: "asc" },
  });
}

async function updateStudentStatus(id: string, data: UpdateStatusInput) {
  const student = await prisma.studentProfile.findUnique({ where: { id } });
  if (!student) {
    throw Object.assign(new Error("Student not found"), { status: 404 });
  }

  return prisma.studentProfile.update({ where: { id }, data });
}

async function updateTeacherStatus(id: string, data: UpdateStatusInput) {
  const teacher = await prisma.instructorProfile.findUnique({ where: { id } });
  if (!teacher) {
    throw Object.assign(new Error("Teacher not found"), { status: 404 });
  }

  return prisma.instructorProfile.update({ where: { id }, data });
}

async function createNotice(data: CreateNoticeInput) {
  return prisma.notice.create({ data: { title: data.title, body: data.body, target: data.target || "ALL" } });
}

async function updateNotice(id: string, data: UpdateNoticeInput) {
  const notice = await prisma.notice.findUnique({ where: { id } });
  if (!notice) {
    throw Object.assign(new Error("Notice not found"), { status: 404 });
  }

  return prisma.notice.update({ where: { id }, data });
}

async function deleteNotice(id: string) {
  const notice = await prisma.notice.findUnique({ where: { id } });
  if (!notice) {
    throw Object.assign(new Error("Notice not found"), { status: 404 });
  }

  await prisma.notice.delete({ where: { id } });
}

export const dashboardService = {
  // student
  getStudentOverview,
  getStudentAttendance,
  getStudentRoutine,
  getStudentResults,
  // teacher
  getTeacherOverview,
  getTeacherRoutine,
  getSessionStudents,
  submitAttendance,
  // admin
  getAdminOverview,
  getDepartments,
  getStudentsList,
  getTeachersList,
  updateStudentStatus,
  updateTeacherStatus,
  createNotice,
  updateNotice,
  deleteNotice,
};

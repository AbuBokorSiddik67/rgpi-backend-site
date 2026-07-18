export interface StudentProfile {
  id: number;
  rollNumber: string;
  semester: number;
  session: string;
  bloodGroup: string | null;
  dateOfBirth: string | null;
  guardianName: string | null;
  guardianPhone: string | null;
  address: string | null;
  admissionDate: string | null;
  user: {
    id: number;
    email: string;
    name: string | null;
    phone: string | null;
    role: string;
  };
  department: {
    id: number;
    name: string;
    code: string;
    description: string | null;
  };
}

export interface DashboardData {
  profile: {
    name: string | null;
    rollNumber: string;
    department: string;
    semester: number;
    session: string;
  };
  attendance: {
    total: number;
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };
  recentNotices: Array<{
    id: number;
    title: string;
    type: string;
    publishedAt: string;
  }>;
  upcomingCareers: Array<{
    id: number;
    title: string;
    company: string;
    type: string;
    deadline: string | null;
  }>;
}

export interface AttendanceRecord {
  id: number;
  date: string;
  status: string;
  subject: string | null;
  remark: string | null;
}

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
  records: AttendanceRecord[];
}

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  type: string;
  publishedAt: string;
  expiresAt: string | null;
  department: { name: string; code: string } | null;
}

export interface CareerItem {
  id: number;
  title: string;
  company: string;
  description: string;
  type: string;
  location: string | null;
  salary: string | null;
  deadline: string | null;
  department: { name: string; code: string } | null;
}

export interface AcademicInfo {
  rollNumber: string;
  semester: number;
  session: string;
  department: {
    name: string;
    code: string;
    description: string | null;
  };
  subjects: Array<{
    code: string;
    name: string;
    credit: number;
    type: string;
  }>;
  routine: Array<{
    day: string;
    periods: Array<{
      time: string;
      subject: string;
      teacher: string;
      room: string;
    }>;
  }>;
}

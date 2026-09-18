export type PairType = 'curs' | 'sem' | 'lab' | 'consult' | 'exam';

export interface DisciplineInfo {
  id: string;
  ruTitle: string;
  roTitle: string;
  shortTitle: string;
  icon: string; // Lucide icon identifier
  badgeColor: string; // Tailwind class
  accentColor: string;
  lightBg: string;
  borderClass: string;
  keywords: string[];
}

export interface TeacherInfo {
  id: string;
  fullName: string;
  shortName: string;
  title: string;
  department: string;
  email?: string;
  room?: string;
}

export interface PairItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "08:00 - 09:30"
  startTime: string; // "08:00"
  endTime: string; // "09:30"
  title: string;
  subjectId: string;
  type: PairType;
  room: string;
  building?: string;
  teacherId: string;
  teacherName: string;
  details?: string;
  isOnline?: boolean;
  meetingLink?: string;
}

export interface ScheduleDay {
  date: string;
  dayOfWeekRu: string;
  shortDayRu: string;
  isToday: boolean;
  pairs: PairItem[];
}

export interface ConsultationItem {
  id: string;
  date: string;
  label: string;
  time: string;
  room: string;
  title: string;
  subjectId: string;
  teacher: string;
  details: string;
}

export interface FilterState {
  searchQuery: string;
  selectedDiscipline: string;
  selectedTeacher: string;
  selectedType: string;
}

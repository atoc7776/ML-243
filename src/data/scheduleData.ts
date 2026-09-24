import { DisciplineInfo, TeacherInfo, PairItem, ConsultationItem } from '../types';

export const GROUP_NAME = 'ML-243';
export const GROUP_FULL_NAME = 'Группа ML-243 · Расписание занятий';
export const FACULTY_NAME = 'Расписание занятий для группы ML-243 (19.09.2026 – 05.10.2026)';

export const DISCIPLINES: DisciplineInfo[] = [
  {
    id: 'management_calitate',
    ruTitle: 'Менеджмент качества',
    roTitle: 'Managementul calităţii',
    shortTitle: 'Менеджмент качества',
    icon: 'Award',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-200',
    accentColor: '#2563eb',
    lightBg: 'bg-blue-50/70',
    borderClass: 'border-l-blue-500',
    keywords: ['менеджмент качества', 'управление качеством', 'managementul calitatii', 'turcan', 'цуркан']
  },
  {
    id: 'filosofie',
    ruTitle: 'Философия и критическое мышление',
    roTitle: 'Filosofie şi gîndire critică',
    shortTitle: 'Философия',
    icon: 'BookOpen',
    badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-200',
    accentColor: '#d97706',
    lightBg: 'bg-amber-50/70',
    borderClass: 'border-l-amber-500',
    keywords: ['философия', 'критическое мышление', 'filosofie', 'gindire critica', 'maistru', 'майстру']
  },
  {
    id: 'logistica',
    ruTitle: 'Логистика запасов и снабжения',
    roTitle: 'Logistica stocurilor şi Logistica aprovizionării',
    shortTitle: 'Логистика запасов',
    icon: 'Package',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    accentColor: '#059669',
    lightBg: 'bg-emerald-50/70',
    borderClass: 'border-l-emerald-500',
    keywords: ['логистика', 'запасы', 'снабжение', 'logistica', 'stocuri', 'bogdanova', 'богданова']
  },
  {
    id: 'comert_international',
    ruTitle: 'Международная торговля',
    roTitle: 'Comerţ internaţional',
    shortTitle: 'Междунар. торговля',
    icon: 'Globe',
    badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-200',
    accentColor: '#7c3aed',
    lightBg: 'bg-purple-50/70',
    borderClass: 'border-l-purple-500',
    keywords: ['международная торговля', 'торговля', 'comert international', 'badarau', 'бэдэрэу']
  },
  {
    id: 'integrare_economica',
    ruTitle: 'Экономическая интеграция и европейская экономика',
    roTitle: 'Integrarea economică şi economie europeană',
    shortTitle: 'Евроинтеграция',
    icon: 'TrendingUp',
    badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-200',
    accentColor: '#e11d48',
    lightBg: 'bg-rose-50/70',
    borderClass: 'border-l-rose-500',
    keywords: ['экономическая интеграция', 'европейская экономика', 'интеграция', 'integrarea economica', 'badarau', 'бэдэрэу']
  }
];

export const TEACHERS: TeacherInfo[] = [
  {
    id: 't_turcan',
    fullName: 'conf. univ., dr. Iu. Ţurcan',
    shortName: 'Iu. Ţurcan',
    title: 'Conferențiar universitar, doctor',
    department: 'Менеджмент качества',
    email: 'iurie.turcan@utm.md',
    room: 'ауд. 415, 418'
  },
  {
    id: 't_maistru',
    fullName: 'conf. univ., dr. R. Maistru',
    shortName: 'R. Maistru',
    title: 'Conferențiar universitar, doctor',
    department: 'Философия и критическое мышление',
    email: 'rodica.maistru@utm.md',
    room: 'ауд. 228, 322, 412, 415'
  },
  {
    id: 't_bogdanova',
    fullName: 'l. univ., dr. S. Bogdanova',
    shortName: 'S. Bogdanova',
    title: 'Lector universitar, doctor',
    department: 'Логистика запасов и снабжения',
    email: 'svetlana.bogdanova@utm.md',
    room: 'ауд. 412, 419, а. 10'
  },
  {
    id: 't_badarau',
    fullName: 'conf. univ., dr. E. Bădărău',
    shortName: 'E. Bădărău',
    title: 'Conferențiar universitar, doctor',
    department: 'Международная торговля & Европейская экономика',
    email: 'elena.badarau@utm.md',
    room: 'ауд. 115, 116, 211, 216, 228, 322, 339, 414, 417, 419'
  }
];

// Полное расписание занятий для ML-243 (19.09.2026 – 05.10.2026)
export const SCHEDULE_PAIRS: PairItem[] = [
  // 19.09.2026 (Суббота)
  {
    id: 'p-19-1',
    date: '2026-09-19',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'curs',
    room: '415',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-19-2',
    date: '2026-09-19',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'curs',
    room: '415',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-19-3',
    date: '2026-09-19',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'curs',
    room: '415',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },

  // 20.09.2026 (Воскресенье)
  {
    id: 'p-20-1',
    date: '2026-09-20',
    time: '08:00 - 09:30',
    startTime: '08:00',
    endTime: '09:30',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'curs',
    room: '418',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-20-2',
    date: '2026-09-20',
    time: '09:45 - 11:15',
    startTime: '09:45',
    endTime: '11:15',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'curs',
    room: '418',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-20-3',
    date: '2026-09-20',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'curs',
    room: '418',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-20-4',
    date: '2026-09-20',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '412',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-20-5',
    date: '2026-09-20',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '412',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },

  // 21.09.2026 (Понедельник)
  {
    id: 'p-21-0',
    date: '2026-09-21',
    time: '09:45 - 11:15',
    startTime: '09:45',
    endTime: '11:15',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '?',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-21-1',
    date: '2026-09-21',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '228',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-21-2',
    date: '2026-09-21',
    time: '13:30 - 14:30',
    startTime: '13:30',
    endTime: '14:30',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '228',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-21-3',
    date: '2026-09-21',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'curs',
    room: '419',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },
  {
    id: 'p-21-4',
    date: '2026-09-21',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'curs',
    room: '419',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },
  {
    id: 'p-21-5',
    date: '2026-09-21',
    time: '18:45 - 20:15',
    startTime: '18:45',
    endTime: '20:15',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'curs',
    room: '419',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },

  // 22.09.2026 (Вторник)
  {
    id: 'p-22-1',
    date: '2026-09-22',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'curs',
    room: '412',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },
  {
    id: 'p-22-2',
    date: '2026-09-22',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'curs',
    room: '412',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },
  {
    id: 'p-22-3',
    date: '2026-09-22',
    time: '18:45 - 20:15',
    startTime: '18:45',
    endTime: '20:15',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'curs',
    room: '412',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },

  // 23.09.2026 (Среда)
  {
    id: 'p-23-1',
    date: '2026-09-23',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '228',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-23-2',
    date: '2026-09-23',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '228',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-23-3',
    date: '2026-09-23',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'sem',
    room: '415',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-23-4',
    date: '2026-09-23',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'sem',
    room: '415',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-23-5',
    date: '2026-09-23',
    time: '18:45 - 20:15',
    startTime: '18:45',
    endTime: '20:15',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'sem',
    room: '415',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },

 // 24.09.2026 (Четверг)
  {
    id: 'p-24-1',
    date: '2026-09-24',
    time: '08:00 - 09:30',
    startTime: '08:00',
    endTime: '09:30',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'sem',
    room: '418',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-24-2',
    date: '2026-09-24',
    time: '09:45 - 11:15',
    startTime: '09:45',
    endTime: '11:15',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'sem',
    room: '218',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  {
    id: 'p-24-3',
    date: '2026-09-24',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'sem',
    room: '228',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-24-4',
    date: '2026-09-24',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'sem',
    room: '228',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-24-5',
    date: '2026-09-24',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Менеджмент качества',
    subjectId: 'management_calitate',
    type: 'sem',
    room: '417',
    teacherId: 't_turcan',
    teacherName: 'conf. univ., dr. Iu. Ţurcan'
  },
  // 25.09.2026 (Пятница)
  {
    id: 'p-25-1',
    date: '2026-09-25',
    time: '08:00 - 09:30',
    startTime: '08:00',
    endTime: '09:30',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'curs',
    room: '322',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-25-2',
    date: '2026-09-25',
    time: '09:45 - 11:15',
    startTime: '09:45',
    endTime: '11:15',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'curs',
    room: '216',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-25-3',
    date: '2026-09-25',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'curs',
    room: '216',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-25-4',
    date: '2026-09-25',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'sem',
    room: '10',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },
  {
    id: 'p-25-5',
    date: '2026-09-25',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'sem',
    room: '10',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },

  // 26.09.2026 (Суббота)
  {
    id: 'p-26-1',
    date: '2026-09-26',
    time: '09:45 - 11:15',
    startTime: '09:45',
    endTime: '11:15',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'sem',
    room: '322',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-26-2',
    date: '2026-09-26',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'sem',
    room: '322',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },

  // 27.09.2026 (Воскресенье)
  {
    id: 'p-27-1',
    date: '2026-09-27',
    time: '09:45 - 11:15',
    startTime: '09:45',
    endTime: '11:15',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '415',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-27-2',
    date: '2026-09-27',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Философия и критическое мышление',
    subjectId: 'filosofie',
    type: 'curs',
    room: '415',
    teacherId: 't_maistru',
    teacherName: 'conf. univ., dr. R. Maistru'
  },
  {
    id: 'p-27-3',
    date: '2026-09-27',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'curs',
    room: '417',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-27-4',
    date: '2026-09-27',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'curs',
    room: '417',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-27-5',
    date: '2026-09-27',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'curs',
    room: '417',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },

  // 28.09.2026 (Понедельник)
  {
    id: 'p-28-1',
    date: '2026-09-28',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'curs',
    room: '115',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-28-2',
    date: '2026-09-28',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'curs',
    room: '115',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-28-3',
    date: '2026-09-28',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'curs',
    room: '115',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },

  // 29.09.2026 (Вторник)
  {
    id: 'p-29-1',
    date: '2026-09-29',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'sem',
    room: '412',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },
  {
    id: 'p-29-2',
    date: '2026-09-29',
    time: '18:45 - 20:15',
    startTime: '18:45',
    endTime: '20:15',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'sem',
    room: '412',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },

  // 30.09.2026 (Среда)
  {
    id: 'p-30-1',
    date: '2026-09-30',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'sem',
    room: '419',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },
  {
    id: 'p-30-2',
    date: '2026-09-30',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Логистика запасов и снабжения',
    subjectId: 'logistica',
    type: 'sem',
    room: '419',
    teacherId: 't_bogdanova',
    teacherName: 'l. univ., dr. S. Bogdanova'
  },

  // 01.10.2026 (Четверг)
  {
    id: 'p-01-1',
    date: '2026-10-01',
    time: '08:00 - 09:30',
    startTime: '08:00',
    endTime: '09:30',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'curs',
    room: '211',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-01-2',
    date: '2026-10-01',
    time: '09:45 - 11:15',
    startTime: '09:45',
    endTime: '11:15',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'curs',
    room: '228',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-01-3',
    date: '2026-10-01',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'curs',
    room: '228',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },

  // 02.10.2026 (Пятница)
  {
    id: 'p-02-1',
    date: '2026-10-02',
    time: '11:30 - 13:00',
    startTime: '11:30',
    endTime: '13:00',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'sem',
    room: '339',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-02-2',
    date: '2026-10-02',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'sem',
    room: '339',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-02-3',
    date: '2026-10-02',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'sem',
    room: '419',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-02-4',
    date: '2026-10-02',
    time: '17:00 - 18:30',
    startTime: '17:00',
    endTime: '18:30',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'sem',
    room: '419',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-02-5',
    date: '2026-10-02',
    time: '18:45 - 20:15',
    startTime: '18:45',
    endTime: '20:15',
    title: 'Международная торговля',
    subjectId: 'comert_international',
    type: 'sem',
    room: '419',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },

  // 04.10.2026 (Воскресенье)
  {
    id: 'p-04-1',
    date: '2026-10-04',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'sem',
    room: '414',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-04-2',
    date: '2026-10-04',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'sem',
    room: '414',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },

  // 05.10.2026 (Понедельник)
  {
    id: 'p-05-1',
    date: '2026-10-05',
    time: '13:30 - 15:00',
    startTime: '13:30',
    endTime: '15:00',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'sem',
    room: '116',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  },
  {
    id: 'p-05-2',
    date: '2026-10-05',
    time: '15:15 - 16:45',
    startTime: '15:15',
    endTime: '16:45',
    title: 'Экономическая интеграция и европейская экономика',
    subjectId: 'integrare_economica',
    type: 'sem',
    room: '116',
    teacherId: 't_badarau',
    teacherName: 'conf. univ., dr. E. Bădărău'
  }
];

export const CONSULTATIONS_DATA: ConsultationItem[] = [];

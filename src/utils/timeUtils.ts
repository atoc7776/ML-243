import { PairItem, ScheduleDay } from '../types';

export interface LiveStatus {
  state: 'current' | 'break' | 'upcoming_today' | 'finished_today' | 'no_classes_today' | 'future_day';
  currentPair: PairItem | null;
  nextPair: PairItem | null;
  minutesRemainingInCurrent?: number;
  currentProgressPercent?: number;
  minutesUntilNext?: number;
  message: string;
  subMessage?: string;
}

export function parseMinutesFromTime(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function formatMinutes(totalMin: number): string {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h > 0 && m > 0) return `${h} ч ${m} мин`;
  if (h > 0) return `${h} ч`;
  return `${m} мин`;
}

export function getTodayDateString(dateObj: Date = new Date()): string {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getInitialScheduleDate(currentTime: Date, allPairs: PairItem[]): string {
  const todayStr = getTodayDateString(currentTime);
  const availableDates = Array.from(new Set(allPairs.map(p => p.date))).sort();
  if (availableDates.length === 0) return todayStr;

  // 1. Exact match with today's date
  if (availableDates.includes(todayStr)) {
    return todayStr;
  }

  // 2. Match by month and day if year differs (e.g. September/October on different device years)
  const m = String(currentTime.getMonth() + 1).padStart(2, '0');
  const d = String(currentTime.getDate()).padStart(2, '0');
  const monthDayMatch = availableDates.find(date => date.endsWith(`-${m}-${d}`));
  if (monthDayMatch) {
    return monthDayMatch;
  }

  // 3. If today is before the first scheduled date
  if (todayStr < availableDates[0]) {
    return availableDates[0];
  }

  // 4. If today is after the last scheduled date
  if (todayStr > availableDates[availableDates.length - 1]) {
    return availableDates[availableDates.length - 1];
  }

  // 5. If today is within range, find the next upcoming scheduled date
  const nextDate = availableDates.find(d => d >= todayStr);
  if (nextDate) return nextDate;

  return availableDates[0];
}

const RU_DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const RU_DAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const RU_MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export function getDayInfo(dateStr: string): { dayName: string; shortDay: string; formattedDate: string; dayNumber: number } {
  const parts = dateStr.split('-');
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  const dayIdx = d.getDay();
  const dayNum = Number(parts[2]);
  const monthName = RU_MONTHS[Number(parts[1]) - 1] || '';
  return {
    dayName: RU_DAYS[dayIdx] || 'Понедельник',
    shortDay: RU_DAYS_SHORT[dayIdx] || 'Пн',
    formattedDate: `${dayNum} ${monthName}`,
    dayNumber: dayNum
  };
}

export function groupPairsByDate(pairs: PairItem[], activeTodayStr: string): ScheduleDay[] {
  const map = new Map<string, PairItem[]>();

  pairs.forEach(p => {
    const list = map.get(p.date) || [];
    list.push(p);
    map.set(p.date, list);
  });

  const sortedDates = Array.from(map.keys()).sort();

  return sortedDates.map(date => {
    const info = getDayInfo(date);
    const dayPairs = map.get(date) || [];
    // Sort pairs by startTime
    dayPairs.sort((a, b) => a.startTime.localeCompare(b.startTime));

    return {
      date,
      dayOfWeekRu: info.dayName,
      shortDayRu: info.shortDay,
      isToday: date === activeTodayStr,
      pairs: dayPairs
    };
  });
}

/**
 * Computes the real-time schedule status given the current time (in hours and minutes) and today's date
 */
export function calculateLiveStatus(
  todayPairs: PairItem[],
  currentDateStr: string,
  nowTime: Date,
  selectedDateStr: string
): LiveStatus {
  // If the user selected a different date in the viewer
  if (selectedDateStr !== currentDateStr) {
    const isFuture = selectedDateStr > currentDateStr;
    return {
      state: 'future_day',
      currentPair: null,
      nextPair: null,
      message: isFuture ? 'Просмотр расписания на будущий день' : 'Просмотр прошедшего дня',
      subMessage: 'Чтобы увидеть текущую пару в реальном времени, выберите «Сегодня»'
    };
  }

  if (!todayPairs || todayPairs.length === 0) {
    return {
      state: 'no_classes_today',
      currentPair: null,
      nextPair: null,
      message: 'Сегодня занятий нет 🎉',
      subMessage: 'Отличный день для самообразования и отдыха!'
    };
  }

  const currentMinutes = nowTime.getHours() * 60 + nowTime.getMinutes();
  const currentSeconds = nowTime.getSeconds();
  const currentTotalSeconds = currentMinutes * 60 + currentSeconds;

  // Check if any pair is active right now
  for (let i = 0; i < todayPairs.length; i++) {
    const pair = todayPairs[i];
    const startMin = parseMinutesFromTime(pair.startTime);
    const endMin = parseMinutesFromTime(pair.endTime);

    if (currentMinutes >= startMin && currentMinutes < endMin) {
      const pairTotalSec = (endMin - startMin) * 60;
      const elapsedSec = currentTotalSeconds - startMin * 60;
      const progressPercent = Math.min(100, Math.max(0, Math.round((elapsedSec / pairTotalSec) * 100)));
      const minutesRemaining = endMin - currentMinutes;

      const nextPair = i + 1 < todayPairs.length ? todayPairs[i + 1] : null;

      return {
        state: 'current',
        currentPair: pair,
        nextPair,
        minutesRemainingInCurrent: minutesRemaining,
        currentProgressPercent: progressPercent,
        message: `Сейчас идёт пара: ${pair.title}`,
        subMessage: `Осталось ${minutesRemaining} мин · ауд. ${pair.room}`
      };
    }
  }

  // Check if before first pair
  const firstPair = todayPairs[0];
  const firstStartMin = parseMinutesFromTime(firstPair.startTime);

  if (currentMinutes < firstStartMin) {
    const minUntil = firstStartMin - currentMinutes;
    return {
      state: 'upcoming_today',
      currentPair: null,
      nextPair: firstPair,
      minutesUntilNext: minUntil,
      message: `Сегодня первая пара в ${firstPair.startTime}`,
      subMessage: `До начала ${formatMinutes(minUntil)} (${firstPair.title})`
    };
  }

  // Check if during break between pairs
  for (let i = 0; i < todayPairs.length - 1; i++) {
    const thisPair = todayPairs[i];
    const nextPair = todayPairs[i + 1];
    const endMin = parseMinutesFromTime(thisPair.endTime);
    const nextStartMin = parseMinutesFromTime(nextPair.startTime);

    if (currentMinutes >= endMin && currentMinutes < nextStartMin) {
      const minUntilNext = nextStartMin - currentMinutes;
      return {
        state: 'break',
        currentPair: null,
        nextPair,
        minutesUntilNext: minUntilNext,
        message: `Перерыв между парами (${minUntilNext} мин)`,
        subMessage: `Следующая пара в ${nextPair.startTime}: ${nextPair.title} (${nextPair.room})`
      };
    }
  }

  // If after last pair
  const lastPair = todayPairs[todayPairs.length - 1];
  const lastEndMin = parseMinutesFromTime(lastPair.endTime);

  if (currentMinutes >= lastEndMin) {
    return {
      state: 'finished_today',
      currentPair: null,
      nextPair: null,
      message: 'Все пары на сегодня завершены!',
      subMessage: 'Хорошего вечера! Вы можете ознакомиться с расписанием на следующие дни.'
    };
  }

  return {
    state: 'no_classes_today',
    currentPair: null,
    nextPair: null,
    message: 'Расписание на день активно',
    subMessage: ''
  };
}

export function getPairStatus(pair: PairItem, todayStr: string, nowTime: Date): 'current' | 'next' | 'past' | 'upcoming' {
  if (pair.date < todayStr) return 'past';
  if (pair.date > todayStr) return 'upcoming';

  const currentMinutes = nowTime.getHours() * 60 + nowTime.getMinutes();
  const startMin = parseMinutesFromTime(pair.startTime);
  const endMin = parseMinutesFromTime(pair.endTime);

  if (currentMinutes >= startMin && currentMinutes < endMin) {
    return 'current';
  }
  if (currentMinutes >= endMin) {
    return 'past';
  }
  return 'upcoming';
}

/**
 * Generate iCalendar .ics file content for a pair or all pairs
 */
export function generateIcsFile(pairs: PairItem[]): string {
  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ML-243 Schedule App//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Расписание группы ML-243',
    'X-WR-TIMEZONE:Europe/Chisinau'
  ];

  pairs.forEach(p => {
    const [startH, startM] = p.startTime.split(':');
    const [endH, endM] = p.endTime.split(':');
    const dateFormatted = p.date.replace(/-/g, '');
    const dtStart = `${dateFormatted}T${startH}${startM}00`;
    const dtEnd = `${dateFormatted}T${endH}${endM}00`;

    ics.push(
      'BEGIN:VEVENT',
      `UID:${p.id}@ml243.schedule`,
      `DTSTAMP:${dateFormatted}T000000Z`,
      `DTSTART;TZID=Europe/Chisinau:${dtStart}`,
      `DTEND;TZID=Europe/Chisinau:${dtEnd}`,
      `SUMMARY:${p.title}`,
      `LOCATION:Аудитория ${p.room}, ${p.building || ''}`,
      `DESCRIPTION:Преподаватель: ${p.teacherName}\\n${p.details || ''}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );
  });

  ics.push('END:VCALENDAR');
  return ics.join('\r\n');
}

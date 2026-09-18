import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ScheduleDay } from '../types';

interface DaysTabsProps {
  days: ScheduleDay[];
  selectedDate: string;
  todayDateStr: string;
  onSelectDate: (date: string) => void;
  onGoToToday: () => void;
}

export const DaysTabs: React.FC<DaysTabsProps> = ({
  days,
  selectedDate,
  todayDateStr,
  onSelectDate,
  onGoToToday,
}) => {
  const isTodaySelected = selectedDate === todayDateStr;

  return (
    <div className="space-y-2">
      {/* Header row above tabs */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Дни занятий
          </span>
          <span className="text-xs text-slate-500 font-medium">
            (19 сен – 5 окт 2026)
          </span>
        </div>

        {!isTodaySelected && (
          <button
            onClick={onGoToToday}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Вернуться к Сегодня</span>
          </button>
        )}
      </div>

      {/* Tabs list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 scrollbar-none">
        {days.map((day) => {
          const isSelected = day.date === selectedDate;
          const isToday = day.date === todayDateStr;
          const parts = day.date.split('-');
          const dayNum = parts[2];
          const monthShort = parts[1] === '10' ? 'окт' : 'сен';

          return (
            <button
              key={day.date}
              onClick={() => onSelectDate(day.date)}
              className={`relative flex flex-col items-center justify-center min-w-[72px] sm:min-w-[84px] py-2 px-2.5 rounded-2xl border transition-all duration-200 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-102'
                  : isToday
                  ? 'bg-indigo-50/90 text-indigo-950 border-indigo-200 hover:bg-indigo-100/80'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {/* Day of week */}
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wide ${
                  isSelected ? 'text-indigo-100' : isToday ? 'text-indigo-600' : 'text-slate-400'
                }`}
              >
                {day.shortDayRu}
              </span>

              {/* Date day number and month */}
              <div className="flex items-baseline gap-1 my-0.5">
                <span
                  className={`text-lg sm:text-xl font-extrabold font-mono leading-tight ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {dayNum}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    isSelected ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {monthShort}
                </span>
              </div>

              {/* Count of pairs / today badge */}
              <div className="flex items-center gap-1">
                {isToday && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-amber-300' : 'bg-emerald-500'
                    }`}
                  />
                )}
                <span
                  className={`text-[10px] font-bold ${
                    isSelected ? 'text-indigo-100' : 'text-slate-500'
                  }`}
                >
                  {day.pairs.length} {day.pairs.length === 1 ? 'пара' : day.pairs.length < 5 ? 'пары' : 'пар'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

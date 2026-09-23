import React, { useEffect, useRef, useCallback } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Function to center a specific date tab in the visible horizontal container
  const centerTab = useCallback((dateStr: string, smooth: boolean = true) => {
    const container = containerRef.current;
    if (!container) return;

    const btn = tabRefs.current.get(dateStr) || tabRefs.current.get(todayDateStr);
    if (!btn) return;

    const containerWidth = container.clientWidth;
    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [todayDateStr]);

  // Initial auto-scroll on mount so today's date is immediately visible in front of user
  useEffect(() => {
    const target = selectedDate || todayDateStr;
    // Immediate scroll
    centerTab(target, false);

    // Re-run after layout calculations to guarantee accurate centering across mobile and desktop
    const timer = setTimeout(() => {
      centerTab(target, false);
    }, 60);

    return () => clearTimeout(timer);
  }, []); // Run on mount

  // Smooth scroll when selected date changes
  useEffect(() => {
    if (selectedDate) {
      centerTab(selectedDate, true);
    }
  }, [selectedDate, centerTab]);

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
            onClick={() => {
              onGoToToday();
              centerTab(todayDateStr, true);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 transition-all cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>К Сегодня</span>
          </button>
        )}
      </div>

      {/* Tabs list with auto-scroll */}
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 scrollbar-none scroll-smooth"
      >
        {days.map((day) => {
          const isSelected = day.date === selectedDate;
          const isToday = day.date === todayDateStr;
          const parts = day.date.split('-');
          const dayNum = parts[2];
          const monthShort = parts[1] === '10' ? 'окт' : 'сен';

          return (
            <button
              key={day.date}
              ref={(el) => {
                if (el) tabRefs.current.set(day.date, el);
                else tabRefs.current.delete(day.date);
              }}
              onClick={() => {
                onSelectDate(day.date);
                centerTab(day.date, true);
              }}
              className={`relative flex flex-col items-center justify-center min-w-[76px] sm:min-w-[86px] py-2 px-2.5 rounded-2xl border transition-all duration-200 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-102 ring-2 ring-indigo-400/30'
                  : isToday
                  ? 'bg-emerald-50/90 text-emerald-950 border-emerald-300 ring-2 ring-emerald-500/20 hover:bg-emerald-100/90'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {/* Today mini-badge */}
              {isToday && (
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full mb-0.5 leading-tight ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-emerald-600 text-white shadow-2xs'
                  }`}
                >
                  Сегодня
                </span>
              )}

              {/* Day of week */}
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wide ${
                  isSelected
                    ? 'text-indigo-100'
                    : isToday
                    ? 'text-emerald-700'
                    : 'text-slate-400'
                }`}
              >
                {day.shortDayRu}
              </span>

              {/* Date day number and month */}
              <div className="flex items-baseline gap-1 my-0.5">
                <span
                  className={`text-lg sm:text-xl font-extrabold font-mono leading-tight ${
                    isSelected
                      ? 'text-white'
                      : isToday
                      ? 'text-emerald-950 font-black'
                      : 'text-slate-900'
                  }`}
                >
                  {dayNum}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    isSelected
                      ? 'text-indigo-200'
                      : isToday
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  {monthShort}
                </span>
              </div>

              {/* Count of pairs / indicator dot */}
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
                    isSelected
                      ? 'text-indigo-100'
                      : isToday
                      ? 'text-emerald-800'
                      : 'text-slate-500'
                  }`}
                >
                  {day.pairs.length}{' '}
                  {day.pairs.length === 1
                    ? 'пара'
                    : day.pairs.length < 5
                    ? 'пары'
                    : 'пар'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

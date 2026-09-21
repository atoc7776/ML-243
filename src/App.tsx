import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Calendar } from 'lucide-react';
import {
  SCHEDULE_PAIRS,
  DISCIPLINES,
} from './data/scheduleData';
import {
  getTodayDateString,
  groupPairsByDate,
  getPairStatus,
  getDayInfo
} from './utils/timeUtils';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { DaysTabs } from './components/DaysTabs';
import { PairCard } from './components/PairCard';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const todayDateStr = getTodayDateString(currentTime);

  // Selected date in schedule viewer (always defaults to today,
  // unless the page was opened via a shared link with ?day=...)
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const dayParam = params.get('day');
    if (dayParam) return dayParam;

    return todayDateStr;
  });

  // Popup "no pairs today": shown once on entry if today has no pairs
  // (not shown when the page is opened via a shared link to a specific day)
  const [isNoPairsOpen, setIsNoPairsOpen] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('day')) return false;
    return !SCHEDULE_PAIRS.some((p) => p.date === todayDateStr);
  });

  // Selected discipline filter ('all' or discipline id)
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('subject') || 'all';
  });

  // Share modal state
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Update clock every minute for relative pair status badges (e.g. "Идёт сейчас")
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Sync selected day and subject with URL query parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDate && selectedDate !== todayDateStr) {
      params.set('day', selectedDate);
    }
    if (selectedDiscipline !== 'all') {
      params.set('subject', selectedDiscipline);
    }

    const newQuery = params.toString();
    const newUrl = newQuery ? `${window.location.pathname}?${newQuery}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [selectedDate, selectedDiscipline, todayDateStr]);

  // Filter pairs by selected discipline
  const filteredPairs = useMemo(() => {
    if (selectedDiscipline === 'all') {
      return SCHEDULE_PAIRS;
    }
    return SCHEDULE_PAIRS.filter((pair) => pair.subjectId === selectedDiscipline);
  }, [selectedDiscipline]);

  // Group pairs by date
  const scheduleDays = useMemo(() => {
    return groupPairsByDate(filteredPairs, todayDateStr);
  }, [filteredPairs, todayDateStr]);

  // Current selected day's pairs
  const activeDayPairs = useMemo(() => {
    const day = scheduleDays.find((d) => d.date === selectedDate);
    return day ? day.pairs : [];
  }, [scheduleDays, selectedDate]);

  const selectedDayInfo = useMemo(() => {
    return getDayInfo(selectedDate);
  }, [selectedDate]);

  const handleGoToToday = useCallback(() => {
    setSelectedDate(todayDateStr);
  }, [todayDateStr]);

  const activeDisciplineInfo = useMemo(() => {
    return DISCIPLINES.find((d) => d.id === selectedDiscipline);
  }, [selectedDiscipline]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      
      {/* Header */}
      <Header
        currentTime={currentTime}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main schedule view */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5 space-y-4">
        
        {/* Discipline tablets filter */}
        <FilterBar
          selectedDiscipline={selectedDiscipline}
          onSelectDiscipline={(subjectId) => setSelectedDiscipline(subjectId)}
          totalPairsCount={filteredPairs.length}
        />

        {/* Schedule Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-4">
          
          {/* Days navigation tabs */}
          <DaysTabs
            days={scheduleDays}
            selectedDate={selectedDate}
            todayDateStr={todayDateStr}
            onSelectDate={(d) => setSelectedDate(d)}
            onGoToToday={handleGoToToday}
          />

          {/* Active day header */}
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-2.5 pt-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                {selectedDayInfo.dayName}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {selectedDayInfo.formattedDate}
              </span>
              {selectedDate === todayDateStr && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Сегодня
                </span>
              )}
            </div>
            <div className="text-xs font-bold text-slate-500">
              {activeDayPairs.length}{' '}
              {activeDayPairs.length === 1
                ? 'занятие'
                : activeDayPairs.length < 5
                ? 'занятия'
                : 'занятий'}
            </div>
          </div>

          {/* Schedule list for selected day */}
          {activeDayPairs.length === 0 ? (
            <div className="text-center py-10 px-4 bg-slate-50/80 rounded-2xl border border-dashed border-slate-200 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                {selectedDiscipline !== 'all'
                  ? `В этот день нет пар по предмету «${activeDisciplineInfo?.shortTitle || ''}»`
                  : 'В этот день занятий нет'}
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {selectedDiscipline !== 'all'
                  ? 'Выберите другой предмет или сбросьте фильтр.'
                  : 'Свободный от занятий день или выходной.'}
              </p>
              {selectedDiscipline !== 'all' && (
                <button
                  onClick={() => setSelectedDiscipline('all')}
                  className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Показать все предметы
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {activeDayPairs.map((pair) => {
                const pairStatus = getPairStatus(pair, todayDateStr, currentTime);
                return (
                  <PairCard
                    key={pair.id}
                    pair={pair}
                    status={pairStatus}
                    onSelectSubject={(sId) => setSelectedDiscipline(sId)}
                  />
                );
              })}
            </div>
          )}
        </div>

      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        selectedDate={selectedDate}
      />

      {/* "No pairs today" popup */}
      {isNoPairsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
          onClick={() => setIsNoPairsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-6 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <p className="text-base font-extrabold text-slate-900">
              Сегодня пар нет - чудеса случаются даже в расписании
            </p>
            <button
              onClick={() => setIsNoPairsOpen(false)}
              className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

import React from 'react';
import {
  Clock,
  MapPin,
  User,
  Award,
  BookOpen,
  Package,
  Globe,
  TrendingUp
} from 'lucide-react';
import { PairItem, PairType } from '../types';
import { DISCIPLINES } from '../data/scheduleData';

interface PairCardProps {
  pair: PairItem;
  status: 'current' | 'next' | 'past' | 'upcoming';
  onSelectSubject?: (subjectId: string) => void;
}

const TYPE_CONFIG: Record<PairType, { label: string; bg: string; text: string; border: string }> = {
  curs: { label: 'Лекция', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  sem: { label: 'Семинар', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  lab: { label: 'Лабораторная', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  consult: { label: 'Консультация', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  exam: { label: 'Экзамен', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
};

function renderDisciplineIcon(iconName: string, className: string = 'w-5 h-5') {
  switch (iconName) {
    case 'Award':
      return <Award className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Package':
      return <Package className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

export const PairCard: React.FC<PairCardProps> = ({
  pair,
  status,
  onSelectSubject,
}) => {
  const discipline = DISCIPLINES.find((d) => d.id === pair.subjectId);
  const typeConf = TYPE_CONFIG[pair.type] || TYPE_CONFIG.curs;

  const isCurrent = status === 'current';
  const isPast = status === 'past';
  const isNext = status === 'next';

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 p-4 sm:p-5 ${
        isCurrent
          ? 'bg-emerald-50/70 border-emerald-400 shadow-md shadow-emerald-500/10 scale-[1.01]'
          : isNext
          ? 'bg-amber-50/50 border-amber-300 shadow-xs'
          : isPast
          ? 'bg-white/60 border-slate-200/60 opacity-60 hover:opacity-100'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
      }`}
      style={{
        borderLeftWidth: '5px',
        borderLeftColor: isCurrent ? '#10b981' : discipline?.accentColor || '#6366f1',
      }}
    >
      <div className="flex flex-col gap-3">
        
        {/* Top header row: Time, room, type badge, live status */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Time badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold font-mono tracking-tight ${
                isCurrent
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{pair.time}</span>
            </div>

            {/* Room badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100/90 text-slate-700 text-xs font-bold border border-slate-200/70">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>ауд. {pair.room}</span>
            </div>

            {/* Type badge (Russian only: Лекция / Семинар) */}
            <span
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold border ${typeConf.bg} ${typeConf.text} ${typeConf.border}`}
            >
              {typeConf.label}
            </span>
          </div>

          {/* Current / Next live status */}
          <div className="flex items-center gap-1.5">
            {isCurrent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider animate-pulse">
                Идёт сейчас
              </span>
            )}
            {isNext && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider">
                Следующая
              </span>
            )}
          </div>
        </div>

        {/* Subject title row with icon */}
        <div className="flex items-start gap-3">
          <button
            onClick={() => onSelectSubject && pair.subjectId && onSelectSubject(pair.subjectId)}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: `${discipline?.accentColor || '#4f46e5'}15`,
              borderColor: `${discipline?.accentColor || '#4f46e5'}35`,
              color: discipline?.accentColor || '#4f46e5',
            }}
            title={discipline ? `Фильтровать по: ${discipline.ruTitle}` : undefined}
          >
            {renderDisciplineIcon(discipline?.icon || 'BookOpen', 'w-5 h-5')}
          </button>

          {/* Subject title in Russian */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {pair.title}
            </h3>
          </div>
        </div>

        {/* Teacher details */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <User className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>{pair.teacherName}</span>
          </div>

          {pair.building && (
            <span className="text-slate-400 hidden sm:inline text-[11px]">
              {pair.building}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

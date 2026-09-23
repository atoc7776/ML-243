import React, { useState } from 'react';
import { Share2, Calendar, Check, Copy } from 'lucide-react';
import { GROUP_NAME, FACULTY_NAME } from '../data/scheduleData';

interface HeaderProps {
  currentTime: Date;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTime,
  onOpenShare,
}) => {
  const [copiedQuick, setCopiedQuick] = useState(false);

  const handleQuickCopy = () => {
    const cleanUrl = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(cleanUrl);
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  const formattedDate = currentTime.toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="relative bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-extrabold text-base shadow-sm shadow-indigo-200">
            ML
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                Расписание {GROUP_NAME}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                2026/2027
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {FACULTY_NAME}
            </p>
          </div>
        </div>

        {/* Right controls: Current date, copy link & share */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-700 capitalize">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{formattedDate}</span>
          </div>

          <button
            onClick={handleQuickCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs font-semibold transition-all shadow-xs cursor-pointer"
            title="Скопировать прямую ссылку на расписание"
          >
            {copiedQuick ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Копировать ссылку</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs shadow-indigo-200 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Поделиться</span>
          </button>
        </div>

      </div>
    </header>
  );
};

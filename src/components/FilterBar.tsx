import React from 'react';
import { Award, BookOpen, Package, Globe, TrendingUp, Layers } from 'lucide-react';
import { DISCIPLINES } from '../data/scheduleData';

interface FilterBarProps {
  selectedDiscipline: string;
  onSelectDiscipline: (disciplineId: string) => void;
  totalPairsCount: number;
}

function renderDisciplineIcon(iconName: string, className: string = 'w-4 h-4') {
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

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedDiscipline,
  onSelectDiscipline,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>Предметы:</span>
        </div>
        {selectedDiscipline !== 'all' && (
          <button
            onClick={() => onSelectDiscipline('all')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            Показать все
          </button>
        )}
      </div>

      {/* Subject tablets grid / scrollable row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
        {/* All subjects tablet */}
        <button
          onClick={() => onSelectDiscipline('all')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
            selectedDiscipline === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Все предметы</span>
        </button>

        {/* Individual subject tablets */}
        {DISCIPLINES.map((d) => {
          const isSelected = selectedDiscipline === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onSelectDiscipline(isSelected ? 'all' : d.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-200'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                style={{
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : `${d.accentColor}15`,
                  color: isSelected ? '#ffffff' : d.accentColor,
                }}
              >
                {renderDisciplineIcon(d.icon, 'w-3.5 h-3.5')}
              </span>
              <span className="whitespace-nowrap">{d.shortTitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { X, User, Mail, MapPin, BookOpen, Clock, Calendar } from 'lucide-react';
import { TEACHERS, SCHEDULE_PAIRS, DISCIPLINES } from '../data/scheduleData';
import { TeacherInfo } from '../types';

interface TeacherModalProps {
  teacherId: string | null;
  onClose: () => void;
  onFilterByTeacher: (teacherId: string) => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  teacherId,
  onClose,
  onFilterByTeacher,
}) => {
  if (!teacherId) return null;

  const teacher = TEACHERS.find((t) => t.id === teacherId);
  if (!teacher) return null;

  const teacherPairs = SCHEDULE_PAIRS.filter((p) => p.teacherId === teacherId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                {teacher.fullName}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {teacher.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact / Office details */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold">{teacher.department}</span>
          </div>
          {teacher.room && (
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>{teacher.room}</span>
            </div>
          )}
          {teacher.email && (
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
              <a
                href={`mailto:${teacher.email}`}
                className="text-indigo-600 hover:underline font-mono"
              >
                {teacher.email}
              </a>
            </div>
          )}
        </div>

        {/* Teacher's classes in ML-243 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Занятия в группе ML-243 ({teacherPairs.length})
            </h4>
            <button
              onClick={() => {
                onFilterByTeacher(teacher.id);
                onClose();
              }}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded-lg"
            >
              Фильтровать в расписании
            </button>
          </div>

          <div className="space-y-2">
            {teacherPairs.map((pair) => {
              const disc = DISCIPLINES.find((d) => d.id === pair.subjectId);
              return (
                <div
                  key={pair.id}
                  className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-2 text-slate-500 font-mono">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {pair.date} · {pair.time}
                    </span>
                    <span className="font-semibold text-slate-600">ауд. {pair.room}</span>
                  </div>
                  <div className="font-bold text-slate-900 mt-0.5">{pair.title}</div>
                  {pair.details && <div className="text-slate-500 text-[11px]">{pair.details}</div>}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

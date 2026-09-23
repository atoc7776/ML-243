import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { GROUP_NAME } from '../data/scheduleData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.origin + window.location.pathname;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Расписание занятий ${GROUP_NAME}`,
          text: `Актуальное расписание занятий группы ${GROUP_NAME}`,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  // Generate a clean SVG QR code visual for current URL
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=ffffff&color=1e1b4b&margin=6`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Поделиться расписанием
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Группа {GROUP_NAME} · Прямой доступ
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

        {/* Link Copy Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Ссылка на веб-приложение расписания:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 select-all focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
            </button>
          </div>
        </div>

        {/* QR Code display */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
            <img
              src={qrSvgUrl}
              alt="QR Code"
              className="w-36 h-36 rounded-lg object-contain"
            />
          </div>
          <p className="text-xs font-semibold text-slate-600">
            Наведите камеру смартфона для быстрого перехода
          </p>
        </div>

        {/* Actions row: Native share */}
        <div className="pt-1">
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-indigo-600" />
            <span>Отправить в Telegram / соцсети</span>
          </button>
        </div>

      </div>
    </div>
  );
};

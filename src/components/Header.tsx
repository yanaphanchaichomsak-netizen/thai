import React from 'react';
import { BookOpen, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface HeaderProps {
  onRestart?: () => void;
  showRestart?: boolean;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRestart,
  showRestart,
  soundEnabled,
  setSoundEnabled,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    soundEffects.enabled = next;
    setSoundEnabled(next);
  };

  return (
    <header id="app-header" className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-800 text-base sm:text-lg leading-tight">
                เกมคำทับศัพท์ภาษาไทย
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                ราชบัณฑิตยสภา
              </span>
            </div>
            <p className="text-xs text-slate-500">
              แบบทดสอบ 20 ข้อ พร้อมเฉลยและเหตุผล
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="sound-toggle-btn"
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'ปิดเสียง' : 'เปิดเสียง'}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label={soundEnabled ? 'ปิดเสียง' : 'เปิดเสียง'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showRestart && onRestart && (
            <button
              id="header-restart-btn"
              type="button"
              onClick={onRestart}
              title="เริ่มเล่นใหม่"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">เริ่มใหม่</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

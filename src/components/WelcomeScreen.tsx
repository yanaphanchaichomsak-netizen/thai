import React from 'react';
import { Play, Sparkles, CheckCircle2, Shuffle, GraduationCap, ShieldCheck } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGame: () => void;
  totalQuestions: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartGame,
  totalQuestions,
}) => {
  return (
    <div id="welcome-screen" className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4 text-indigo-500" />
        <span>วิชาภาษาไทย • หมวดคำยืมภาษาต่างประเทศ</span>
      </div>

      {/* Main Title */}
      <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
        แบบทดสอบ <span className="text-indigo-600">คำทับศัพท์</span>
      </h2>
      <p className="text-slate-600 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
        ทดสอบความแม่นยำในการสะกดคำทับศัพท์ภาษาอังกฤษตามหลักเกณฑ์ของ
        <span className="font-semibold text-slate-800"> สำนักงานราชบัณฑิตยสภา </span>
        จำนวน {totalQuestions} ข้อ ที่คนไทยมักเขียนสับสนบ่อยที่สุด
      </p>

      {/* Feature Highlights Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 mb-8 text-left">
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          กติกาและรูปแบบการเล่น
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-600">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="p-2 rounded-lg bg-indigo-100/80 text-indigo-700 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-slate-800">คำถาม 20 ข้อมาตรฐาน</p>
              <p className="text-xs text-slate-500 mt-0.5">ครอบคลุมทั้งคำศัพท์ไอที ชีวิตประจำวัน และสื่อสารสนเทศ</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="p-2 rounded-lg bg-emerald-100/80 text-emerald-700 shrink-0 mt-0.5">
              <Shuffle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-slate-800">สุ่มสลับตัวเลือก A-D</p>
              <p className="text-xs text-slate-500 mt-0.5">ตัวเลือกจะสุ่มลำดับใหม่ทุกครั้งที่เริ่มเล่นรอบใหม่</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="p-2 rounded-lg bg-amber-100/80 text-amber-700 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-slate-800">เฉลยพร้อมเหตุผลทันที</p>
              <p className="text-xs text-slate-500 mt-0.5">บอกหลักเทียบเสียงและวรรณยุกต์ให้ได้เรียนรู้ทันที</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="p-2 rounded-lg bg-blue-100/80 text-blue-700 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-slate-800">อ้างอิงราชบัณฑิตยสภา</p>
              <p className="text-xs text-slate-500 mt-0.5">ยึดตามพจนานุกรมและประกาศกำหนดหลักเกณฑ์ฉบับทางการ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        id="start-game-button"
        type="button"
        onClick={onStartGame}
        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
      >
        <Play className="w-5 h-5 fill-current" />
        <span>เริ่มเล่นเกม</span>
      </button>

      <p className="text-xs text-slate-400 mt-4">
        พร้อมท้าทายความจำและเพิ่มพูนความรู้ภาษาไทยไปด้วยกัน
      </p>
    </div>
  );
};

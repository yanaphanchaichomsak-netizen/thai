import React, { useState } from 'react';
import { RotateCcw, Trophy, CheckCircle2, XCircle, ChevronDown, ChevronUp, BookOpen, Sparkles, Award } from 'lucide-react';
import { Question, AnswerRecord } from '../types';

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  answers: AnswerRecord[];
  questions: Question[];
  onPlayAgain: () => void;
}

export const ScoreScreen: React.FC<ScoreScreenProps> = ({
  score,
  totalQuestions,
  answers,
  questions,
  onPlayAgain,
}) => {
  const [showReview, setShowReview] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine encouragement feedback
  let tierTitle = '';
  let tierMessage = '';
  let badgeColor = '';

  if (score >= 19) {
    tierTitle = 'ยอดเยี่ยมไร้ที่ติ! 🏆';
    tierMessage =
      'คุณคือผู้เชี่ยวชาญคำทับศัพท์ตามหลักราชบัณฑิตยสภาตัวจริง! มีความรู้ความแม่นยำสูงมากและไม่หลงกลคำที่มักเขียนผิด';
    badgeColor = 'from-amber-400 to-amber-600 text-white';
  } else if (score >= 15) {
    tierTitle = 'เก่งมากๆ เลยค่ะ/ครับ! 🌟';
    tierMessage =
      'มีความรู้ความเข้าใจในหลักเกณฑ์คำทับศัพท์เป็นอย่างดีมาก รู้ทันคำที่มักใช้สับสน ฝึกฝนอีกเพียงนิดเดียวจะเต็มร้อยแน่นอน';
    badgeColor = 'from-indigo-500 to-blue-600 text-white';
  } else if (score >= 10) {
    tierTitle = 'ทำได้ดี ผ่านเกณฑ์มาตรฐาน! 👍';
    tierMessage =
      'มีพื้นฐานที่ดีแล้ว หลายคำเป็นคำที่เขียนผิดกันบ่อยในชีวิตประจำวัน ลองศึกษาหลักเกณฑ์เพิ่มเติมจากเฉลยเพื่อความแม่นยำยิ่งขึ้น';
    badgeColor = 'from-emerald-500 to-teal-600 text-white';
  } else {
    tierTitle = 'พยายามได้ดีมากเลยค่ะ/ครับ! 📚';
    tierMessage =
      'คำทับศัพท์ตามหลักราชบัณฑิตยสภามักมีรูปเขียนที่ต่างจากความคุ้นเคยตามสื่อทั่วไป อย่าเพิ่งท้อ ลองอ่านเฉลยแล้วกดเล่นอีกรอบดูนะ!';
    badgeColor = 'from-purple-500 to-pink-500 text-white';
  }

  return (
    <div id="score-screen" className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-10">
      {/* Top Score Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 text-center mb-6">
        {/* Trophy icon */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-tr ${badgeColor} flex items-center justify-center shadow-md mb-4`}
        >
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 mb-2">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          สรุปผลการทำแบบทดสอบ
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {tierTitle}
        </h2>

        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
          {tierMessage}
        </p>

        {/* Score Numbers */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto mb-6">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-0.5">คะแนนที่ได้</p>
            <p className="text-2xl sm:text-3xl font-black text-indigo-600">
              {score} <span className="text-sm font-normal text-slate-400">/ {totalQuestions}</span>
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div>
            <p className="text-xs text-slate-500 font-medium mb-0.5">คิดเป็นร้อยละ</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-800">
              {percentage}%
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div>
            <p className="text-xs text-slate-500 font-medium mb-0.5">ตอบถูก</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600">
              {score} <span className="text-sm font-normal text-slate-400">ข้อ</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="play-again-btn"
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4" />
            <span>เล่นอีกครั้ง (สุ่มตัวเลือกใหม่)</span>
          </button>

          <button
            id="toggle-review-btn"
            type="button"
            onClick={() => setShowReview(!showReview)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors text-sm sm:text-base cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span>{showReview ? 'ซ่อนเฉลยทั้ง 20 ข้อ' : 'ดูเฉลยและคำอธิบายทั้งหมด'}</span>
            {showReview ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Review Section */}
      {showReview && (
        <div id="review-list" className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              เฉลยละเอียดและหลักเกณฑ์ราชบัณฑิตยสภา
            </h3>
            <span className="text-xs text-slate-500">20 ข้อ</span>
          </div>

          {questions.map((q, idx) => {
            const answerRecord = answers.find((a) => a.questionId === q.id);
            const userChoice = answerRecord?.selectedOption;
            const isCorrect = userChoice === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs transition-all ${
                  isCorrect ? 'border-slate-200' : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      ข้อ {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      {q.englishWord}
                    </span>
                  </div>

                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ตอบถูก
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full shrink-0">
                      <XCircle className="w-3.5 h-3.5" />
                      ตอบผิด
                    </span>
                  )}
                </div>

                <p className="font-medium text-slate-900 text-sm sm:text-base mb-3">
                  {q.questionText}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-xs mb-0.5">คุณเลือก:</span>
                    <span
                      className={`font-semibold ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {userChoice || '-'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <span className="text-emerald-600 block text-xs mb-0.5">คำตอบที่ถูกต้อง:</span>
                    <span className="font-bold text-emerald-800">
                      {q.correctAnswer}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-slate-600 text-xs border border-slate-100 leading-relaxed">
                  <span className="font-semibold text-slate-800">💡 เหตุผล: </span>
                  {q.rationale}
                </div>
              </div>
            );
          })}

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={onPlayAgain}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 text-sm cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>เล่นใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

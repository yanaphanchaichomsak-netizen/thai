import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Award, HelpCircle, BookOpen } from 'lucide-react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalCount: number;
  shuffledOptions: string[];
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  score: number;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentIndex,
  totalCount,
  shuffledOptions,
  selectedOption,
  onSelectOption,
  onNext,
  isLastQuestion,
  score,
}) => {
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === question.correctAnswer;
  const progressPercent = Math.round(((currentIndex + 1) / totalCount) * 100);

  return (
    <div id="quiz-container" className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
            ข้อที่ {currentIndex + 1} จาก {totalCount}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs">
            {question.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <Award className="w-4 h-4 text-amber-500" />
          <span>คะแนน:</span>
          <span className="font-bold text-indigo-600 text-base">{score}</span>
          <span className="text-slate-400">/ {currentIndex + (isAnswered ? 1 : 0)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 mb-6">
        <div className="mb-2">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
            คำศัพท์: {question.englishWord}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
          {question.questionText}
        </h2>

        {/* Options List (A-D) */}
        <div className="space-y-3" role="radiogroup" aria-label="ตัวเลือกคำตอบ">
          {shuffledOptions.map((option, idx) => {
            const label = OPTION_LABELS[idx] || `${idx + 1}`;
            const isSelected = selectedOption === option;
            const isThisCorrect = option === question.correctAnswer;

            // Compute button styling based on state
            let buttonStyle =
              'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-800 bg-white';
            let labelStyle = 'bg-slate-100 text-slate-600 border-slate-200';
            let icon = null;

            if (isAnswered) {
              if (isSelected && isCorrect) {
                // User chose correctly
                buttonStyle =
                  'border-emerald-500 bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300';
                labelStyle = 'bg-emerald-700 text-white border-emerald-500';
                icon = <CheckCircle2 className="w-5 h-5 text-white shrink-0" />;
              } else if (isSelected && !isCorrect) {
                // User chose wrong
                buttonStyle =
                  'border-rose-500 bg-rose-600 text-white shadow-md ring-2 ring-rose-300';
                labelStyle = 'bg-rose-700 text-white border-rose-500';
                icon = <XCircle className="w-5 h-5 text-white shrink-0" />;
              } else if (isThisCorrect) {
                // This was the correct answer (revealed after wrong choice)
                buttonStyle =
                  'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-400 font-semibold';
                labelStyle = 'bg-emerald-600 text-white border-emerald-600';
                icon = (
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>คำตอบที่ถูกต้อง</span>
                  </div>
                );
              } else {
                // Irrelevant option
                buttonStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                labelStyle = 'bg-slate-100 text-slate-400 border-slate-200';
              }
            }

            return (
              <button
                key={option}
                id={`quiz-option-${label.toLowerCase()}`}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectOption(option)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 text-sm sm:text-base font-medium min-h-[54px] cursor-pointer disabled:cursor-default ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${labelStyle}`}
                  >
                    {label}
                  </span>
                  <span className="leading-snug">{option}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Feedback & Rationale Card */}
      {isAnswered && (
        <div
          id="answer-feedback-panel"
          className={`rounded-2xl p-5 sm:p-6 border shadow-xs mb-6 animate-fade-in transition-all ${
            isCorrect
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/90 border-rose-200 text-rose-950'
          }`}
        >
          {/* Header text required by prompt */}
          <div className="flex items-center gap-2.5 mb-3">
            {isCorrect ? (
              <>
                <div className="p-1.5 rounded-full bg-emerald-600 text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-emerald-800">
                    ถูกต้องค่ะ/ครับ! 🎉
                  </h3>
                  <p className="text-xs text-emerald-700">เก่งมาก! ตอบได้อย่างถูกต้องตามหลักเกณฑ์</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-1.5 rounded-full bg-rose-600 text-white">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-rose-800">
                    ยังไม่ถูกต้องค่ะ/ครับ
                  </h3>
                  <p className="text-xs text-rose-700">
                    คำตอบที่ถูกต้องคือ:{' '}
                    <span className="font-bold underline underline-offset-2 text-rose-900">
                      {question.correctAnswer}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Rationale Explanation Box */}
          <div className="bg-white/80 rounded-xl p-3.5 sm:p-4 border border-slate-200/60 mt-3 text-slate-700 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>คำอธิบายเหตุผลตามหลักเกณฑ์ราชบัณฑิตยสภา:</span>
            </div>
            <p className="leading-relaxed font-normal text-slate-600">
              {question.rationale}
            </p>
          </div>

          {/* Next Button */}
          <div className="mt-5 flex justify-end">
            <button
              id="next-question-btn"
              type="button"
              onClick={onNext}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
            >
              <span>{isLastQuestion ? 'ดูผลคะแนนรวม' : 'ข้อถัดไป'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

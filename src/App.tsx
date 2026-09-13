import { useState, useMemo, useCallback } from 'react';
import { questionsData } from './data/questions';
import { GameStatus, AnswerRecord } from './types';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizCard } from './components/QuizCard';
import { ScoreScreen } from './components/ScoreScreen';
import { soundEffects } from './utils/sound';

/**
 * Fisher-Yates shuffle algorithm to guarantee uniform distribution
 * of options A-D every round played.
 */
function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [status, setStatus] = useState<GameStatus>('welcome');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Pre-generate shuffled options for each question when starting or restarting
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, string[]>>({});

  const totalQuestions = questionsData.length;

  // Initialize a new game round with freshly shuffled A-D choices
  const startNewGame = useCallback(() => {
    const newOptionsMap: Record<number, string[]> = {};
    questionsData.forEach((q) => {
      newOptionsMap[q.id] = shuffleArray(q.options);
    });

    setShuffledOptionsMap(newOptionsMap);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setStatus('playing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Calculate current score
  const score = useMemo(() => {
    return answers.filter((a) => a.isCorrect).length;
  }, [answers]);

  const currentQuestion = questionsData[currentIndex];
  const currentShuffledOptions = currentQuestion
    ? shuffledOptionsMap[currentQuestion.id] || currentQuestion.options
    : [];

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || !currentQuestion) return;

    const isCorrect = option === currentQuestion.correctAnswer;
    setSelectedOption(option);

    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }

    const newRecord: AnswerRecord = {
      questionId: currentQuestion.id,
      selectedOption: option,
      isCorrect,
      shuffledOptions: currentShuffledOptions,
    };

    setAnswers((prev) => [...prev, newRecord]);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      soundEffects.playComplete();
      setStatus('completed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartToWelcome = () => {
    setStatus('welcome');
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Header
        onRestart={handleRestartToWelcome}
        showRestart={status !== 'welcome'}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <main className="flex-1 flex flex-col justify-center">
        {status === 'welcome' && (
          <WelcomeScreen
            onStartGame={startNewGame}
            totalQuestions={totalQuestions}
          />
        )}

        {status === 'playing' && currentQuestion && (
          <QuizCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalCount={totalQuestions}
            shuffledOptions={currentShuffledOptions}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            isLastQuestion={currentIndex === totalQuestions - 1}
            score={score}
          />
        )}

        {status === 'completed' && (
          <ScoreScreen
            score={score}
            totalQuestions={totalQuestions}
            answers={answers}
            questions={questionsData}
            onPlayAgain={startNewGame}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-200/60 mt-auto">
        <p>อ้างอิงตามหลักเกณฑ์การทับศัพท์ภาษาอังกฤษ สำนักงานราชบัณฑิตยสภา</p>
      </footer>
    </div>
  );
}

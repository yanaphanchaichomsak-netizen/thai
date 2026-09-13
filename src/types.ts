export interface Question {
  id: number;
  englishWord: string;
  questionText: string;
  category: string;
  correctAnswer: string;
  options: string[];
  rationale: string;
}

export type GameStatus = 'welcome' | 'playing' | 'completed';

export interface AnswerRecord {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
  shuffledOptions: string[];
}

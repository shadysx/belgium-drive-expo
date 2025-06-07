import { QuizQuestion } from "./quiz-question.interface";

export interface ShuffledQuizQuestion extends QuizQuestion {
  originalIndexMap: Record<number, number>;
}

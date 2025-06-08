import { QuizType } from "~/enums/quiz-type.enum";

export interface QuizRequest {
  length?: number;
  theme?: string;
  quizType: QuizType;
}

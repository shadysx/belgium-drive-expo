import { QuizQuestion } from "~/interfaces/quiz-question.interface";

export interface QuizSubmissionElement {
  questionId: string;
  userAnswerIndex: number | null;
}

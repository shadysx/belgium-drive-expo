import { QuizType } from "~/enums/quiz-type.enum";
import { QuizSubmissionElement } from "~/interfaces/dto/quiz-submission-element.interface";

export interface QuizSubmission {
  type: QuizType;
  quizSubmissionElements: QuizSubmissionElement[];
}

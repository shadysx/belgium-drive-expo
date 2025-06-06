import { QuizType } from "~/enums/quiz-type.enum";
import { QuizResultElement } from "~/interfaces/quiz-result-element.interface";
import { UserAchievement } from "~/interfaces/user-achievement.interface";
import { ProgressData } from "./progress-data.interface";

export interface QuizResultDto {
  id: string;
  userId: string;
  type: QuizType;
  score: number;
  quizResultElements: QuizResultElement[];
  createdAt: string | Date;
  updatedAt: string | Date;
  progressData: ProgressData;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export const shuffleAnswers = (question: QuizQuestion) => {
  const answers = [...question.answers];
  const originalIndexMap: Record<number, number> = {};

  answers.forEach((_, index) => {
    originalIndexMap[index] = index;
  });

  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
    [originalIndexMap[i], originalIndexMap[j]] = [
      originalIndexMap[j],
      originalIndexMap[i],
    ];
  }

  return {
    ...question,
    answers,
    answerIndex: originalIndexMap[question.answerIndex],
    originalIndexMap,
  };
};

export const formatFirebaseUrl = (url: string) => {
  const formattedUrl = url
    .replace("/images/", "/images%2F")
    .replace("thumbnails/", "thumbnails%2F");

  return formattedUrl;
};

export const isPassed = (score: number, totalQuestions: number) => {
  return score / totalQuestions > 0.8;
};

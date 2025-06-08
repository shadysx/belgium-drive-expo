import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import { SERVER_BASE_URL } from "./constants";

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

  const randomNumber = Math.floor(Math.random() * answers.length);
  console.log("randomNumber", randomNumber);
  [answers[0], answers[randomNumber]] = [answers[randomNumber], answers[0]];
  [originalIndexMap[0], originalIndexMap[randomNumber]] = [
    originalIndexMap[randomNumber],
    originalIndexMap[0],
  ];

  return {
    ...question,
    answers,
    answerIndex: originalIndexMap[0],
    originalIndexMap,
  };
};

/*
 * Since passing objects as string params from quiz to results,
 * After parsing the %2F encoding from firebase is replaced with /, so we need to restore the initial url
 */
export const formatFirebaseUrl = (url: string) => {
  const formattedUrl = url
    .replace("/images/", "/images%2F")
    .replace("thumbnails/", "thumbnails%2F");

  return formattedUrl;
};

/**
 * Formats an image URL from our own file server to be usable on mobile
 * - If the URL starts with "/api", adds SERVER_BASE_URL
 * - If the URL is already absolute (http/https), returns it
 */
export const formatImageUrl = (url: string | null | undefined) => {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return formatFirebaseUrl(url);
  }

  if (url.startsWith("/api")) {
    return `${SERVER_BASE_URL}${url}`;
  }
};

export const isPassed = (score: number, totalQuestions: number) => {
  return score / totalQuestions > 0.8;
};

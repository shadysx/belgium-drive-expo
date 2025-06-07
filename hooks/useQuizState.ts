import { useState } from "react";
import { QuizSubmissionElement } from "~/interfaces/dto/quiz-submission-element.interface";

export const useQuizState = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [quizSubmissionElements, setQuizSubmissionElements] = useState<
    QuizSubmissionElement[]
  >([]);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswerIndex(null);
  };

  const addSubmissionElement = (element: QuizSubmissionElement) => {
    setQuizSubmissionElements((prev) => [...prev, element]);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setQuizSubmissionElements([]);
  };

  return {
    currentQuestionIndex,
    selectedAnswerIndex,
    quizSubmissionElements,
    setSelectedAnswerIndex,
    nextQuestion,
    addSubmissionElement,
    resetQuiz,
  };
};

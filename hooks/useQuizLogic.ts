import { useMemo, useState } from "react";
import { router } from "expo-router";
import { QuizSubmission } from "~/interfaces/dto/quiz-submission.interface";
import { QuizSubmissionElement } from "~/interfaces/dto/quiz-submission-element.interface";
import { useSubmitQuiz } from "~/hooks/useQuery/useSubmitQuiz";
import { shuffleAnswers } from "~/lib/utils";
import { QuizType } from "~/enums/quiz-type.enum";
import { useAchievementNotification } from "~/src/contexts/achievement-notification.context";
import { useProgressDialog } from "~/src/contexts/progress-dialog.context";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import { ShuffledQuizQuestion } from "~/interfaces/shuffled-quiz-question.interface";
import { useQueryClient } from "@tanstack/react-query";

interface UseQuizLogicProps {
  questions: QuizQuestion[] | undefined;
  resetTimer: () => void;
  quizType: QuizType;
}

export const useQuizLogic = ({
  questions,
  resetTimer,
  quizType,
}: UseQuizLogicProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [quizSubmissionElements, setQuizSubmissionElements] = useState<
    QuizSubmissionElement[]
  >([]);

  const { showAchievement } = useAchievementNotification();
  const { showProgressDialog } = useProgressDialog();
  const submitQuizMutation = useSubmitQuiz(quizType);
  const queryClient = useQueryClient();

  const processedQuestions = useMemo(
    () =>
      questions?.map((question) => {
        const shuffledQuestion = shuffleAnswers(question);
        return shuffledQuestion;
      }),
    [questions]
  );

  const currentQuestion: ShuffledQuizQuestion | undefined = useMemo(() => {
    return processedQuestions?.[currentQuestionIndex];
  }, [processedQuestions, currentQuestionIndex]);

  const questionsLength = questions?.length ?? 0;

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

  const handleAnswer = async () => {
    try {
      if (!currentQuestion) return;

      let originalIndex = null;

      if (selectedAnswerIndex !== null) {
        originalIndex = currentQuestion.originalIndexMap[selectedAnswerIndex];
      }

      const quizSubmissionElement: QuizSubmissionElement = {
        questionId: currentQuestion.id,
        userAnswerIndex: originalIndex,
      };

      const quizSubmission: QuizSubmission = {
        quizSubmissionElements: [
          ...quizSubmissionElements,
          quizSubmissionElement,
        ],
        quizType: quizType,
      };

      setQuizSubmissionElements((prev) => [...prev, quizSubmissionElement]);

      const answerIsCorrect =
        selectedAnswerIndex === currentQuestion.answerIndex;
      const isSurvivalQuiz = quizType === QuizType.SURVIVAL;
      const isQuizOver = currentQuestionIndex >= questionsLength - 1;

      if (
        (!isQuizOver && !isSurvivalQuiz) ||
        (isSurvivalQuiz && answerIsCorrect)
      ) {
        nextQuestion();
        resetTimer();
      } else if (isQuizOver || (isSurvivalQuiz && !answerIsCorrect)) {
        const result = await submitQuizMutation.mutateAsync(quizSubmission);

        if (result.progressData.completedUserAchievements.length > 0) {
          showAchievement(
            result.progressData.completedUserAchievements[0].achievement
          );
        }

        showProgressDialog(result.progressData);

        await queryClient.refetchQueries({
          queryKey: ["leaderboards"],
          type: "active",
        });

        router.replace({
          pathname:
            quizType === QuizType.SURVIVAL ? "/survival-results" : "/results",
          params: {
            quizResult: JSON.stringify(result),
            quizLength: JSON.stringify(questionsLength),
          },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    currentQuestionIndex,
    selectedAnswerIndex,
    quizSubmissionElements,
    processedQuestions,
    currentQuestion,
    questionsLength,
    setSelectedAnswerIndex,
    nextQuestion,
    addSubmissionElement,
    resetQuiz,
    handleAnswer,
    submitQuizMutation,
  };
};

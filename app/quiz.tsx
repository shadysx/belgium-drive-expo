import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Text } from "~/components/ui/text";
import { useState, useMemo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { QuizSubmission } from "~/interfaces/dto/quiz-submission.interface";
import { QuizSubmissionElement } from "~/interfaces/dto/quiz-submission-element.interface";
import { useSubmitQuiz } from "~/hooks/useQuery/useSubmitQuiz";
import { useQuizTimer } from "~/hooks/useQuizTimer";
import { useGetQuiz } from "~/hooks/useQuery/useQuiz";
import { QuizRequest } from "~/interfaces/dto/quiz-request.interface";
import { shuffleAnswers } from "~/lib/utils";
import QuizViewer from "~/components/quiz/QuizViewer";
import { useAchievementNotification } from "~/src/contexts/achievement-notification.context";
import { QuizType } from "~/enums/quiz-type.enum";
import QuizHeader from "~/components/quiz/QuizHeader";
import { useProgressDialog } from "~/src/contexts/progress-dialog.context";

const initialTimeLeft = 30;

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [quizSubmissionElements, setQuizSubmissionElements] = useState<
    QuizSubmissionElement[]
  >([]);

  const { quizRequest, quizType } = useLocalSearchParams<{
    quizRequest: string;
    quizType: string;
    theme: string;
  }>();

  const quizRequestParsed: QuizRequest = JSON.parse(quizRequest);
  const quizTypeParsed: QuizType = JSON.parse(quizType);

  const {
    data: questions,
    error,
    isError,
    isLoading,
  } = useGetQuiz(quizRequestParsed);

  const processedQuestions = useMemo(
    () =>
      questions?.map((question) => {
        const shuffledQuestion = shuffleAnswers(question);
        return shuffledQuestion;
      }),
    [questions]
  );

  const questionsLength = questions?.length ?? 0;

  const { showAchievement } = useAchievementNotification();
  const { showProgressDialog } = useProgressDialog();
  const submitQuizMutation = useSubmitQuiz();
  const { timeLeft, resetTimer } = useQuizTimer(initialTimeLeft, () => {
    handleAnswer();
  });

  const currentQuestion = useMemo(() => {
    return processedQuestions?.[currentQuestionIndex];
  }, [processedQuestions, currentQuestionIndex]);

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
        type: quizTypeParsed,
      };

      setQuizSubmissionElements((prev) => [...prev, quizSubmissionElement]);

      if (currentQuestionIndex < questionsLength - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswerIndex(null);
        resetTimer();
      } else {
        const result = await submitQuizMutation.mutateAsync(quizSubmission);

        if (result.progressData.completedUserAchievements.length > 0) {
          showAchievement(
            result.progressData.completedUserAchievements[0].achievement
          );
        }

        console.log(
          "result.progressData",
          JSON.stringify(result.progressData, null, 2)
        );
        showProgressDialog(result.progressData);

        router.replace({
          pathname: "/results",
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

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-destructive text-center">
          {error instanceof Error ? error.message : "Something went wrong"}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="px-2 flex-1">
        <View className="flex-1">
          <View className="mb-4">
            <QuizHeader
              timeLeft={timeLeft}
              currentQuestionIndex={currentQuestionIndex}
              questionsLength={questionsLength}
            />
          </View>

          {currentQuestion && (
            <QuizViewer
              question={currentQuestion}
              selectedAnswerIndex={selectedAnswerIndex}
              setSelectedAnswerIndex={setSelectedAnswerIndex}
              handleAnswer={handleAnswer}
            />
          )}
        </View>

        {submitQuizMutation.isPending && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-4">Soumission en cours...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

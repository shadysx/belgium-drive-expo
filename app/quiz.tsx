import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useState, useMemo, useEffect } from "react";
import { Image } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import QuizButtons from "~/components/quiz/QuizButtons";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import QuizHeader from "~/components/quiz/QuizHeader";
import { QuizType } from "~/enums/quiz-type.enum";
import { SERVER_BASE_URL } from "~/lib/constants";
import { QuizSubmission } from "~/interfaces/dto/quiz-submission.interface";
import { QuizSubmissionElement } from "~/interfaces/dto/quiz-submission-element.interface";
import { useSubmitQuiz } from "~/hooks/useQuery/useSubmitQuiz";
import { useGetQuestions } from "~/hooks/useQuery/useQuestions";
import { useQuizTimer } from "~/hooks/useQuizTimer";

const initialTimeLeft = 3;

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [quizSubmissionElements, setQuizSubmissionElements] = useState<
    QuizSubmissionElement[]
  >([]);

  const { data: questions, error, isError, isLoading } = useGetQuestions();

  const shuffledQuestions = useMemo(
    () => questions?.sort(() => Math.random() - 0.5).slice(0, 40),
    [questions]
  );

  const submitQuizMutation = useSubmitQuiz();
  const { timeLeft, resetTimer } = useQuizTimer(initialTimeLeft, () => {
    handleAnswer();
  });

  // TODO: To this server side
  const currentQuestion: QuizQuestion | undefined = useMemo(() => {
    return shuffledQuestions?.[currentQuestionIndex];
  }, [shuffledQuestions, currentQuestionIndex]);

  const handleAnswer = async () => {
    try {
      if (!currentQuestion) return;

      const quizSubmissionElement: QuizSubmissionElement = {
        questionId: currentQuestion.id,
        userAnswerIndex: selectedAnswerIndex,
      };

      setQuizSubmissionElements((prev) => [...prev, quizSubmissionElement]);

      if (currentQuestionIndex < 39) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswerIndex(null);
        resetTimer();
      } else {
        const quizSubmission: QuizSubmission = {
          quizSubmissionElements: quizSubmissionElements,
          type: QuizType.SIMULATION,
        };
        const result = await submitQuizMutation.mutateAsync(quizSubmission);
        router.replace({
          pathname: "/results",
          params: {
            quizResult: JSON.stringify(result),
          },
        });
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
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
      <View className="flex-1">
        <View className="px-4 flex-1">
          <View className="my-4">
            <QuizHeader
              timeLeft={timeLeft}
              currentQuestionIndex={currentQuestionIndex}
            />
          </View>

          <Animated.View entering={FadeInDown.delay(200)} className="flex-1">
            <Card className="overflow-hidden">
              {currentQuestion?.imageUrl && (
                <View className="w-full aspect-[1.4]">
                  <Image
                    source={{ uri: currentQuestion.imageUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
              <CardContent className="p-4">
                <Text className="font-medium">{currentQuestion?.text}</Text>
              </CardContent>
            </Card>

            <View className="mt-4 flex-1">
              {currentQuestion && (
                <QuizButtons
                  currentQuestion={currentQuestion}
                  selectedAnswerIndex={selectedAnswerIndex}
                  setSelectedAnswerIndex={setSelectedAnswerIndex}
                  onSubmit={handleAnswer}
                />
              )}
            </View>
          </Animated.View>
        </View>
      </View>

      {submitQuizMutation.isPending && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Soumission en cours...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

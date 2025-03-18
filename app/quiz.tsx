import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "~/lib/api";
import { Image } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import QuizButtons from "~/components/quiz/QuizButtons";
import { Question } from "~/models/question";
import { Button } from "~/components/ui/button";
import QuizHeader from "~/components/quiz/QuizHeader";

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const {
    data: questions,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });

  const shuffledQuestions = useMemo(
    () => questions?.sort(() => Math.random() - 0.5).slice(0, 40),
    [questions]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (currentQuestionIndex < 39) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerIndex(null);
            return 15;
          } else {
            setCurrentQuestionIndex(0);
            router.push({
              pathname: "/results",
              params: { score: score.toString() },
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  useEffect(() => {
    setTimeLeft(15);
  }, [currentQuestionIndex]);

  const currentQuestion: Question | undefined =
    shuffledQuestions?.[currentQuestionIndex];

  const handleAnswer = () => {
    if (selectedAnswerIndex === currentQuestion?.answerIndex) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < 39) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
    } else {
      router.replace({
        pathname: "/results",
        params: { score: score },
      });
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
              score={score}
              currentQuestionIndex={currentQuestionIndex}
            />
          </View>

          <Animated.View entering={FadeInDown.delay(200)} className="flex-1">
            <Card className="overflow-hidden">
              {currentQuestion?.imageUri && (
                <View className="w-full aspect-[1.4]">
                  <Image
                    source={{ uri: currentQuestion.imageUri }}
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
    </SafeAreaView>
  );
}

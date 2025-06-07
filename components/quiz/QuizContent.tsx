import { View, ActivityIndicator } from "react-native";
import { Text } from "~/components/ui/text";
import QuizHeader from "./QuizHeader";
import QuizViewer from "./QuizViewer";
import { ShuffledQuizQuestion } from "~/interfaces/shuffled-quiz-question.interface";

interface QuizContentProps {
  timeLeft: number;
  currentQuestionIndex: number;
  questionsLength: number;
  currentQuestion: ShuffledQuizQuestion | undefined;
  selectedAnswerIndex: number | null;
  setSelectedAnswerIndex: (index: number | null) => void;
  handleAnswer: () => void;
  isSubmitting: boolean;
}

export default function QuizContent({
  timeLeft,
  currentQuestionIndex,
  questionsLength,
  currentQuestion,
  selectedAnswerIndex,
  setSelectedAnswerIndex,
  handleAnswer,
  isSubmitting,
}: QuizContentProps) {
  return (
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

      {isSubmitting && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Soumission en cours...</Text>
        </View>
      )}
    </View>
  );
}

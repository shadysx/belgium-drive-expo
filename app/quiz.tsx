import { useLocalSearchParams } from "expo-router";
import { QuizRequest } from "~/interfaces/dto/quiz-request.interface";
import { useGetQuiz } from "~/hooks/useQuery/useQuiz";
import { useQuizTimer } from "~/hooks/useQuizTimer";
import { useQuizLogic } from "~/hooks/useQuizLogic";
import { QuizType } from "~/enums/quiz-type.enum";
import { SafeAreaView } from "react-native-safe-area-context";
import QuizLoadingState from "~/components/quiz/QuizLoadingState";
import QuizErrorState from "~/components/quiz/QuizErrorState";
import QuizContent from "~/components/quiz/QuizContent";

const initialTimeLeft = 30;

export default function QuizScreen() {
  const { quizRequest } = useLocalSearchParams<{
    quizRequest: string;
  }>();

  const quizRequestParsed: QuizRequest = JSON.parse(quizRequest);

  const {
    data: questions,
    error,
    isError,
    isLoading,
  } = useGetQuiz(quizRequestParsed);

  const { timeLeft, resetTimer } = useQuizTimer(initialTimeLeft, () =>
    handleAnswer()
  );

  const {
    currentQuestionIndex,
    selectedAnswerIndex,
    currentQuestion,
    questionsLength,
    setSelectedAnswerIndex,
    handleAnswer,
    submitQuizMutation,
  } = useQuizLogic({
    quizType: quizRequestParsed.quizType,
    questions,
    resetTimer,
  });

  if (isError) return <QuizErrorState error={error} />;

  if (isLoading) return <QuizLoadingState />;

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <QuizContent
        isSurvivalQuiz={quizRequestParsed.quizType === QuizType.SURVIVAL}
        timeLeft={timeLeft}
        currentQuestionIndex={currentQuestionIndex}
        questionsLength={questionsLength}
        currentQuestion={currentQuestion}
        selectedAnswerIndex={selectedAnswerIndex}
        setSelectedAnswerIndex={setSelectedAnswerIndex}
        handleAnswer={handleAnswer}
        isSubmitting={submitQuizMutation.isPending}
      />
    </SafeAreaView>
  );
}

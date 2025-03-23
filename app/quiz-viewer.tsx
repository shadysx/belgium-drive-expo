import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { QuizType } from "~/enums/quiz-type.enum";
import QuizViewer from "~/components/quiz/QuizViewer";
import { QuizRequest } from "~/interfaces/dto/quiz-request.interface";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import { QuizResultElement } from "~/interfaces/quiz-result-element.interface";
import { cleanUrl } from "~/lib/utils";

export default function QuizView() {
  const { quizResultElement } = useLocalSearchParams<{
    quizResultElement: string;
  }>();

  const quizResultElementParsed: QuizResultElement =
    JSON.parse(quizResultElement);

  const decodedQuestion: QuizQuestion = {
    ...quizResultElementParsed.question,
    imageUrl: cleanUrl(quizResultElementParsed.question.imageUrl),
  };

  return (
    <SafeAreaView className="flex-1">
      <QuizViewer
        isReadOnly={true}
        question={decodedQuestion}
        selectedAnswerIndex={quizResultElementParsed.userAnswerIndex}
      />
    </SafeAreaView>
  );
}

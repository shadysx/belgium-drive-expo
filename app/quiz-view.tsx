import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import QuizViewer from "~/components/quiz/QuizViewer";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import { QuizResultElement } from "~/interfaces/quiz-result-element.interface";
import { formatFirebaseUrl } from "~/lib/utils";

export default function QuizView() {
  const { quizResultElement } = useLocalSearchParams<{
    quizResultElement: string;
  }>();

  const quizResultElementParsed: QuizResultElement =
    JSON.parse(quizResultElement);

  const decodedQuestion: QuizQuestion = {
    ...quizResultElementParsed.question,
    imageUrl: quizResultElementParsed.question.imageUrl,
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

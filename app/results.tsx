import { View, ScrollView, SafeAreaView } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams, router } from "expo-router";
import { QuizResult } from "~/interfaces/quiz-result.interface";
import { QuizResultElement } from "~/interfaces/quiz-result-element.interface";

export default function ResultsScreen() {
  const { quizResult, quizLength } = useLocalSearchParams<{
    quizResult: string;
    quizLength: string;
  }>();

  const result: QuizResult = JSON.parse(quizResult);
  const percentage = (Number(result.score) / Number(quizLength)) * 100;
  const passed = percentage >= 80;

  const getAnswerStatus = (element: QuizResultElement) => {
    if (element.userAnswerIndex === null) return "Unanswered";
    return element.userAnswerIndex === element.question.answerIndex
      ? "Correct"
      : "Incorrect";
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-6">
      <ScrollView className="flex-1 bg-background p-6">
        <Card className="mb-6">
          <CardContent className="p-6 items-center gap-6">
            <Text className="text-2xl font-bold">
              {passed ? "Congratulations! 🎉" : "Keep practicing! 💪"}
            </Text>

            <Text className="text-4xl font-bold text-primary">
              {percentage.toFixed(0)}%
            </Text>

            <Text className="text-muted-foreground text-center">
              You got {result.score}/{quizLength} correct answers
            </Text>

            {/* Detailed Statistics */}
            <View className="w-full gap-2">
              <Text className="font-semibold">Statistics:</Text>
              <Text>
                Date: {new Date(result.createdAt).toLocaleDateString()}
              </Text>
              <Text>Exam type: {result.type}</Text>
              <Text>
                Unanswered questions:{" "}
                {
                  result.quizResultElements.filter(
                    (e) => e.userAnswerIndex === null
                  ).length
                }
              </Text>
            </View>

            {/* Answer Details */}
            <View className="w-full mt-4">
              <Text className="font-semibold mb-2">Question Details:</Text>
              {result.quizResultElements.reverse().map((element, index) => (
                <Card key={element.id} className="mb-2">
                  <CardContent className="p-4">
                    <Text className="font-medium">Question {index + 1}</Text>
                    <Text className="text-sm text-muted-foreground">
                      {element.question.text}
                    </Text>
                    <View className="mt-2">
                      <Text
                        className={
                          getAnswerStatus(element) === "Correct"
                            ? "text-green-600"
                            : getAnswerStatus(element) === "Incorrect"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      >
                        {getAnswerStatus(element)}
                      </Text>
                      {element.userAnswerIndex !== null && (
                        <Text className="text-sm">
                          Your answer:{" "}
                          {element.question.answers[element.userAnswerIndex]}
                        </Text>
                      )}
                      <Text className="text-sm text-green-600">
                        Correct answer:{" "}
                        {element.question.answers[element.question.answerIndex]}
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              ))}
            </View>

            <Button className="w-full" onPress={() => router.push("/home")}>
              <Text className="text-primary-foreground">Back to Home</Text>
            </Button>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

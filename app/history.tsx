import { View, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import { useGetQuiz } from "~/hooks/useQuery/useQuiz";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Trophy, Timer, Target, ChevronRight } from "lucide-react-native";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetQuizResults } from "~/hooks/useQuery/useQuizResults";
import { isPassed } from "~/lib/utils";
import { router } from "expo-router";
import { Header } from "~/components/shared/Header";

export default function HistoryScreen() {
  const { data: quizResults, isLoading } = useGetQuizResults();

  const getQuizTypeIcon = (type: QuizType) => {
    switch (type) {
      case QuizType.SIMULATION:
        return <Timer size={20} className="text-primary" />;
      case QuizType.CUSTOM:
        return <Target size={20} className="text-secondary" />;
      default:
        return null;
    }
  };

  const getQuizTypeLabel = (type: QuizType) => {
    switch (type) {
      case QuizType.SIMULATION:
        return "Examen blanc";
      case QuizType.CUSTOM:
        return "Test personnalisé";
      default:
        return "Test";
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background p-6">
        <Text>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="Historique" />

      <ScrollView className="flex-1">
        <View className="px-6">
          <View className="gap-4">
            {quizResults &&
              quizResults.map((result, index) => (
                <Pressable
                  key={result.id}
                  onPress={() =>
                    router.push({
                      pathname: "/results",
                      params: { quizResult: JSON.stringify(result) },
                    })
                  }
                >
                  <Card>
                    <CardContent className="p-4">
                      <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center gap-2">
                          {getQuizTypeIcon(result.type)}
                          <Text className="font-medium">
                            {getQuizTypeLabel(result.type)}
                          </Text>
                        </View>
                        <Text className="text-muted-foreground">
                          {new Date(result.createdAt).toLocaleDateString()}
                        </Text>
                      </View>

                      <View className="flex-row items-center gap-4">
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2">
                            <Trophy
                              size={20}
                              className={
                                isPassed(
                                  result.score,
                                  result.quizResultElements.length
                                )
                                  ? "text-green-500"
                                  : "text-destructive"
                              }
                            />
                            <Text
                              className={`text-xl font-bold ${
                                isPassed(
                                  result.score,
                                  result.quizResultElements.length
                                )
                                  ? "text-green-500"
                                  : "text-destructive"
                              }`}
                            >
                              {result.score} /{" "}
                              {result.quizResultElements.length}
                            </Text>
                          </View>
                          <Text className="text-muted-foreground">
                            {result.quizResultElements.length} questions
                          </Text>
                        </View>
                      </View>

                      <View className="absolute bottom-4 right-2">
                        <ChevronRight
                          size={16}
                          className="text-muted-foreground"
                        />
                      </View>
                    </CardContent>
                  </Card>
                </Pressable>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

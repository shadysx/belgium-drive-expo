import { View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import { useGetQuiz } from "~/hooks/useQuery/useQuiz";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Trophy, Timer, Target } from "lucide-react-native";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetQuizResults } from "~/hooks/useQuery/useQuizResults";

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
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-2xl font-bold mb-6">Historique des tests</Text>

          <View className="gap-4">
            {quizResults &&
              quizResults.map((result, index) => (
                <Animated.View
                  key={result.id}
                  entering={FadeInDown.delay(index * 100)}
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
                                result.score >= 70
                                  ? "text-green-500"
                                  : "text-destructive"
                              }
                            />
                            <Text
                              className={`text-xl font-bold ${
                                result.score >= 70
                                  ? "text-green-500"
                                  : "text-destructive"
                              }`}
                            >
                              {result.score}%
                            </Text>
                          </View>
                          <Text className="text-muted-foreground">
                            {result.quizResultElements.length} questions
                          </Text>
                        </View>
                      </View>
                    </CardContent>
                  </Card>
                </Animated.View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

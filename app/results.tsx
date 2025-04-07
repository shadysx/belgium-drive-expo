import { View, ScrollView, Image, Dimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams, router } from "expo-router";
import { QuizResult } from "~/interfaces/quiz-result.interface";
import Animated, {
  FadeInDown,
  ZoomIn,
  SlideInRight,
} from "react-native-reanimated";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "~/lib/icons";
import { ChevronLeft } from "~/lib/icons";
import { formatFirebaseUrl, isPassed } from "~/lib/utils";

export default function ResultsScreen() {
  const { quizResult } = useLocalSearchParams<{
    quizResult: string;
  }>();

  const result: QuizResult = JSON.parse(quizResult);
  const passed = isPassed(result.score, result.quizResultElements.length);

  const stats = {
    correct: result.quizResultElements.filter(
      (e) => e.userAnswerIndex === e.question.answerIndex
    ).length,
    wrong: result.quizResultElements.filter(
      (e) =>
        e.userAnswerIndex !== null &&
        e.userAnswerIndex !== e.question.answerIndex
    ).length,
    unanswered: result.quizResultElements.filter(
      (e) => e.userAnswerIndex === null
    ).length,
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInDown.duration(500)}
          className="mr-16 ml-4 mt-4"
        >
          <View className="flex-row items-center gap-2">
            <Pressable onPress={() => router.back()}>
              <ChevronLeft size={32} className="text-primary" />
            </Pressable>
            <Text
              className="text-3xl font-bold"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {passed
                ? "Réussi, félicitations ! 🎉"
                : "Raté, continue tes efforts ! 💪"}
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={ZoomIn.duration(800).delay(300)}
          className="items-center m-8"
        >
          <View
            className={`
            w-40 h-40 rounded-full items-center justify-center
            ${passed ? "bg-green-500/10" : "bg-red-500/10"}
          `}
          >
            <Text
              className={`
              text-4xl font-bold
              ${passed ? "text-green-500" : "text-red-500"}
            `}
            >
              {`${result.score} / ${result.quizResultElements.length}`}
            </Text>
            <Text className="text-muted-foreground">Score</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={SlideInRight.duration(500).delay(400)}
          className="px-6 mb-8"
        >
          <View className="flex-row justify-between gap-4">
            <Card className="flex-1 bg-card border-0">
              <CardContent className="p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <CheckCircle2 size={20} className="text-green-500" />
                  <Text className="text-2xl font-bold text-green-500">
                    {stats.correct}
                  </Text>
                </View>
                <Text className="text-sm text-muted-foreground">Correctes</Text>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-card border-0">
              <CardContent className="p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <XCircle size={20} className="text-red-500" />
                  <Text className="text-2xl font-bold text-red-500">
                    {stats.wrong}
                  </Text>
                </View>
                <Text className="text-sm text-muted-foreground">
                  Incorrectes
                </Text>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-card border-0">
              <CardContent className="p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Clock size={20} className="text-yellow-500" />
                  <Text className="text-2xl font-bold text-yellow-500">
                    {stats.unanswered}
                  </Text>
                </View>
                <Text className="text-sm text-muted-foreground">
                  Sans réponse
                </Text>
              </CardContent>
            </Card>
          </View>
        </Animated.View>

        <View className="px-4 mb-8 flex-1">
          <Text className="text-xl font-semibold mb-4">Questions</Text>
          <View className="flex-row justify-center">
            <View className="flex-row flex-wrap justify-start w-full">
              {result.quizResultElements.map((element, index) => (
                <Animated.View
                  key={element.id}
                  entering={FadeInDown.duration(300).delay(
                    Math.min(index * 50, 1000)
                  )}
                  className="flex-1 basis-[32%] min-w-[80px] max-w-[32%] m-[0.66%]"
                >
                  <Pressable
                    onPress={() => {
                      router.push({
                        pathname: "/quiz-view",
                        params: {
                          quizResultElement: JSON.stringify(element),
                        },
                      });
                    }}
                  >
                    <Card className="overflow-hidden border-0">
                      <View className="relative">
                        {element.question.thumbnailUrl && (
                          <Image
                            source={{
                              uri: formatFirebaseUrl(
                                element.question.thumbnailUrl
                              ),
                            }}
                            className="w-full aspect-square"
                            resizeMode="cover"
                          />
                        )}
                        <View
                          className={`
                          absolute top-2 right-2 w-6 h-6 rounded-full 
                          items-center justify-center
                          ${
                            element.userAnswerIndex ===
                            element.question.answerIndex
                              ? "bg-green-500"
                              : element.userAnswerIndex === null
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }
                        `}
                        >
                          <Text
                            className={`
                              text-[10px] font-bold text-white
                              ${
                                element.question.isSerious
                                  ? "font-extrabold"
                                  : ""
                              }
                            `}
                          >
                            {index + 1}
                          </Text>
                        </View>
                        {element.question.isSerious && (
                          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-md">
                            <Text className="text-[10px] font-bold text-white">
                              GRAVE
                            </Text>
                          </View>
                        )}
                      </View>
                      <CardContent className="p-2">
                        <View className="flex-row items-center justify-end">
                          <ArrowRight size={12} className="text-primary" />
                        </View>
                      </CardContent>
                    </Card>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

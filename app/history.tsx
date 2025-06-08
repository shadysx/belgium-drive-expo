import { View, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { Trophy, ChevronRight, Skull } from "lucide-react-native";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetQuizResults } from "~/hooks/useQuery/useQuizResults";
import { isPassed } from "~/lib/utils";
import { router } from "expo-router";
import { Header } from "~/components/shared/Header";
import { FlashList } from "@shopify/flash-list";
import { QuizResult } from "~/interfaces/quiz-result.interface";
import { Skeleton } from "~/components/ui/skeleton";
import React from "react";

const HistorySkeleton = () => {
  const colorMode = {
    colorMode: "dark",
    backgroundColor: "hsl(var(--muted))",
  };

  return (
    <View className="px-4 space-y-4">
      {[...Array(10)].map((_, key) => (
        <Animated.View
          key={key}
          entering={FadeIn.delay(key * 100)}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-4">
              {/* Header */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-2">
                  <Text>
                    <Skeleton className="w-24 h-4" />
                  </Text>
                </View>
                <Text>
                  <Skeleton className="w-20 h-4" />
                </Text>
              </View>

              {/* Score */}
              <View className="flex-row items-center gap-2">
                <Text>
                  <Skeleton className="w-5 h-5 rounded-full" />
                </Text>
                <Text>
                  <Skeleton className="w-24 h-6" />
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      ))}
    </View>
  );
};

export default function HistoryScreen() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetQuizResults(10);

  const getQuizTypeLabel = (type: QuizType) => {
    switch (type) {
      case QuizType.SIMULATION:
        return "Examen blanc";
      case QuizType.CUSTOM:
        return "Examen personnalisé";
      case QuizType.PREDEFINED:
        return "Examen prédéfini";
      case QuizType.SURVIVAL:
        return "Survie";
      default:
        return "Examen";
    }
  };

  const renderQuizResult = ({ item: result }: { item: QuizResult }) => (
    <Animated.View entering={FadeInDown.delay(200)} className="px-4 mb-4">
      <Pressable
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
                  {result.type === QuizType.SURVIVAL ? (
                    <>
                      <Skull size={20} className="text-green-500" />
                      <Text className={`text-xl font-bold text-green-500`}>
                        {result.score}
                      </Text>
                    </>
                  ) : (
                    <>
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
                        {`${result.score} / ${result.quizResultElements.length}`}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>

            <View className="absolute bottom-4 right-2">
              <ChevronRight size={16} className="text-muted-foreground" />
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </Animated.View>
  );
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        <Header title="Historique" />
        <HistorySkeleton />
      </SafeAreaView>
    );
  }

  const renderFooter = () => {
    if (!hasNextPage) return null;

    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" className="text-primary" />
      </View>
    );
  };

  const allResults = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="Historique" />

      <FlashList
        data={allResults}
        renderItem={renderQuizResult}
        estimatedItemSize={150}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams, router } from "expo-router";
import { QuizResult } from "~/interfaces/quiz-result.interface";
import Animated, {
  FadeInDown,
  SlideInRight,
  BounceIn,
} from "react-native-reanimated";
import { Skull, Trophy, Crown, Medal, ChevronLeft } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { QuizType } from "~/enums/quiz-type.enum";
import { RotateCcw } from "~/lib/icons/RotateCcw";
import { useGetLeaderboards } from "~/hooks/useQuery/useLeaderboards";

export default function SurvivalResultsScreen() {
  const { quizResult } = useLocalSearchParams<{
    quizResult: string;
  }>();

  const result: QuizResult = JSON.parse(quizResult);

  const { data: leaderboards } = useGetLeaderboards();

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown size={20} className="text-yellow-500" />;
      case 2:
        return <Medal size={20} className="text-gray-400" />;
      case 3:
        return <Medal size={20} className="text-orange-500" />;
      default:
        return <Trophy size={20} className="text-muted-foreground" />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header avec Game Over */}
        <Animated.View
          entering={FadeInDown.duration(500)}
          className="mr-4 ml-4 mb-8"
        >
          <View className="flex-row items-center gap-2 mb-4">
            <Pressable onPress={() => router.back()}>
              <ChevronLeft size={32} className="text-primary" />
            </Pressable>
          </View>

          <View className="items-center">
            <Animated.View
              entering={BounceIn.duration(800).delay(200)}
              className="bg-red-500/10 p-6 rounded-full mb-4"
            >
              <Skull size={60} className="text-red-500" />
            </Animated.View>

            <Text className="text-4xl font-bold text-red-500 mb-2">
              GAME OVER
            </Text>
            <Text className="text-lg text-muted-foreground text-center">
              Mode Survie terminé
            </Text>
          </View>
        </Animated.View>
        {/* Statistiques */}
        <Animated.View
          entering={SlideInRight.duration(500).delay(400)}
          className="px-6 mb-8"
        >
          <View className="flex-row justify-between gap-4">
            <Card className="flex-1 bg-card border-0">
              <CardContent className="p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Trophy size={20} className="text-primary" />
                  <Text className="text-2xl font-bold text-primary">
                    {result.previousBestSurvivalScore || 0}
                  </Text>
                </View>
                <Text className="text-sm text-muted-foreground">
                  Meilleur précédent
                </Text>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-card border-0">
              <CardContent className="p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Trophy size={20} className="text-primary" />
                  <Text className="text-2xl font-bold text-primary">
                    {result.newSurvivalScore || 0}
                  </Text>
                </View>
                <Text className="text-sm text-muted-foreground">
                  Score actuel
                </Text>
              </CardContent>
            </Card>
          </View>
        </Animated.View>
        {/* Classement TOP 3 */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(600)}
          className="px-6 mb-8"
        >
          <Text className="text-xl font-semibold mb-4 text-center">
            🏆 TOP 3
          </Text>

          <View className="space-y-3">
            {leaderboards?.global?.survival
              ?.slice(0, 3)
              .map((player, index) => (
                <Animated.View
                  key={player.id}
                  entering={SlideInRight.duration(400).delay(900 + index * 100)}
                >
                  <Card
                    className={`border-0 ${
                      index === 0
                        ? "bg-yellow-500/10 border-yellow-500/30 border"
                        : "bg-card"
                    }`}
                  >
                    <CardContent className="p-4">
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                          {getRankIcon(index + 1)}
                          <View>
                            <Text className="font-semibold">{player.name}</Text>
                            <Text className="text-sm text-muted-foreground">
                              #{index + 1}
                            </Text>
                          </View>
                        </View>
                        <Text className="text-2xl font-bold text-foreground">
                          {player.survivalScore}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                </Animated.View>
              )) || (
              <Text className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </Text>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bouton d'action collé en bas */}
      <Animated.View
        entering={FadeInDown.duration(500).delay(800)}
        className="px-6 pb-4 bg-background"
      >
        <Button
          onPress={() =>
            router.replace({
              pathname: "/quiz",
              params: {
                quizRequest: JSON.stringify({
                  quizType: QuizType.SURVIVAL,
                }),
              },
            })
          }
          className="w-full bg-red-500 hover:bg-red-600"
        >
          <View className="flex-row items-center gap-2">
            <RotateCcw size={20} className="text-white" />
            <Text className="text-white font-semibold">
              Rejouer en mode Survie
            </Text>
          </View>
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
}

import { View, ScrollView, Pressable, Settings } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { authClient } from "~/lib/auth-client";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  Car,
  Book,
  Trophy,
  Brain,
  Timer,
  History,
  LogOut,
  Check,
  Target,
  BarChart3,
  PlayCircle,
  Play,
  Settings2,
} from "lucide-react-native";
import { router } from "expo-router";
import { useGetStats } from "~/hooks/useQuery/useStats";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetThemesWithQuestions } from "~/hooks/useQuery/useThemes";
import { ThemeWithQuestions } from "~/interfaces/theme.interface";
import { formatName } from "~/lib/utils";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useAchievementNotification } from "~/src/contexts/achievement-context";
import StatsCard from "~/components/home/StatsCard";
import ContrastedCardButton from "~/components/home/ContrastedCardButton";
import CardButton from "~/components/home/CardButton";
import { Header } from "~/components/home/Header";

export default function HomeScreen() {
  const { data: stats } = useGetStats();
  const { data: themes } = useGetThemesWithQuestions();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView>
        <View className="py-4 px-6">
          <Header />
        </View>

        <View className="px-6 gap-4">
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="flex-row gap-4"
          >
            <StatsCard
              icon={<Check size={24} className="text-primary" />}
              value={`${
                stats?.successQuizElementRatio?.toFixed(2) ?? "100.00"
              }%`}
              text="Taux de bonnes réponses"
            />
            <StatsCard
              icon={<Brain size={24} className="text-purple-500" />}
              value={stats?.totalQuestionsAnswered?.toString() ?? "0"}
              text="Questions répondues"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(350)}
            className="flex-row gap-4"
          >
            <ContrastedCardButton
              icon={<Car size={24} color="white" />}
              text="Simulation d'examen"
              onPress={() =>
                router.push({
                  pathname: "/quiz",
                  params: {
                    quizRequest: JSON.stringify({
                      length: 50,
                    }),
                    quizType: JSON.stringify(QuizType.SIMULATION),
                  },
                })
              }
            />

            <CardButton
              icon={<Target size={24} />}
              text="Examen personnalisé"
              onPress={() => router.push("/custom-quiz-settings")}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400)}
            className="flex-row gap-4"
          >
            <CardButton
              icon={<History size={24} />}
              text="Historique"
              onPress={() => router.push("/history")}
            />

            <CardButton
              icon={<Trophy size={24} />}
              text="Trophées"
              onPress={() => router.push("/achievements")}
            />
          </Animated.View>

          {/* <Animated.View
            entering={FadeInDown.delay(400)}
            className="flex-row gap-4"
          >
            <CardButton
              icon={<BarChart3 size={24} />}
              text="Statistiques"
              onPress={() => router.push("/history")}
            />

            <CardButton
              icon={<Settings2 size={24} />}
              text="Paramètres"
              onPress={() => router.push("/settings")}
            />
          </Animated.View> */}

          {/* Categories Sections */}
          <Animated.View entering={FadeInDown.delay(450)} className="mb-6">
            <Text className="text-lg font-semibold mb-3">Catégories</Text>

            <View className="gap-3">
              {themes?.map((theme: ThemeWithQuestions) => (
                <Pressable
                  key={theme.id}
                  onPress={() => {
                    router.push({
                      pathname: "/quiz",
                      params: {
                        quizRequest: JSON.stringify({
                          length: theme.questions.length,
                          theme: theme.name,
                        }),
                        quizType: JSON.stringify(QuizType.CUSTOM),
                      },
                    });
                  }}
                >
                  <Card>
                    <CardContent className="flex-row items-center p-4">
                      <View className="flex-1">
                        <Text className="font-medium">
                          {formatName(theme.name)}
                        </Text>
                        <Text className="text-muted-foreground text-sm">
                          {theme.questions.length} questions
                        </Text>
                      </View>
                      {/* TODO: Add custom icons */}
                      <Play className="text-primary" size={24} />
                    </CardContent>
                  </Card>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

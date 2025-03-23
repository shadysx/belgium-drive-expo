import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
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
} from "lucide-react-native";
import { Link, router } from "expo-router";
import { useGetStats } from "~/hooks/useQuery/useStats";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetThemesWithQuestions } from "~/hooks/useQuery/useThemes";
import { Theme, ThemeWithQuestions } from "~/interfaces/theme.interface";
import { formatName } from "~/lib/utils";

export default function HomeScreen() {
  const { data: session } = authClient.useSession();
  const { data: stats } = useGetStats();
  const { data: themes } = useGetThemesWithQuestions();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {/* Header Welcome Section */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="p-6 bg-primary/5"
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold">
                Bonjour, {session?.user?.name || "Conducteur"} 👋
              </Text>
              <Text className="text-muted-foreground mt-1">
                Prêt pour votre session d'entraînement ?
              </Text>
            </View>
            <Button variant="ghost" size="icon" onPress={handleSignOut}>
              <LogOut size={20} className="text-muted-foreground" />
            </Button>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View className="p-6 gap-4">
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="flex-row gap-4"
          >
            <Card
              className="flex-1 bg-primary"
              onTouchStart={() =>
                router.push({
                  pathname: "/quiz",
                  params: {
                    quizRequest: JSON.stringify({
                      length: 40,
                    }),
                    quizType: JSON.stringify(QuizType.SIMULATION),
                  },
                })
              }
            >
              <CardContent className="p-4 items-center">
                <Car size={24} color="white" />
                <Text className="text-primary-foreground mt-2 font-medium">
                  Test Rapide
                </Text>
              </CardContent>
            </Card>

            <Card
              className="flex-1 bg-secondary"
              onTouchStart={() =>
                router.push({
                  pathname: "/custom-quiz-settings",
                  params: {
                    quizRequest: JSON.stringify({
                      length: 10,
                    }),
                    quizType: JSON.stringify(QuizType.CUSTOM),
                  },
                })
              }
            >
              <CardContent className="p-4 items-center">
                <Target size={24} className="text-secondary-foreground" />
                <Text className="text-secondary-foreground mt-2 font-medium">
                  Test personnalisé
                </Text>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Statistics */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="flex-row gap-4"
          >
            <Card className="flex-1" onTouchStart={() => router.push("/test")}>
              <CardContent className="p-4">
                <Check size={20} className="text-primary" />
                <Text className="text-2xl font-bold mt-2">
                  {stats?.successQuizElementRatio?.toFixed(2) ?? "100.00"}%
                </Text>
                <Text className="text-muted-foreground text-sm">
                  Taux de bonnes réponses
                </Text>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardContent className="p-4">
                <Brain size={20} className="text-purple-500" />
                <Text className="text-2xl font-bold mt-2">
                  {stats?.totalQuestionsAnswered ?? 0}
                </Text>
                <Text className="text-muted-foreground text-sm">
                  Questions répondues
                </Text>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Practice Sections */}
          <Animated.View entering={FadeInDown.delay(500)}>
            <Text className="text-lg font-semibold mb-3">Catégories</Text>

            <View className="gap-3">
              <Card
                onTouchStart={() => {
                  router.push({
                    pathname: "/quiz",
                    params: {
                      quizRequest: JSON.stringify({
                        length: 50,
                      }),
                      quizType: JSON.stringify(QuizType.SIMULATION),
                    },
                  });
                }}
              >
                <CardContent className="flex-row items-center p-4">
                  <View className="flex-1">
                    <Text className="font-medium">Examen Blanc</Text>
                    <Text className="text-muted-foreground text-sm">
                      50 questions • 45 minutes
                    </Text>
                  </View>
                  <Timer className="text-primary" size={24} />
                </CardContent>
              </Card>

              {themes?.map((theme: ThemeWithQuestions) => (
                <Card
                  key={theme.id}
                  onTouchStart={() => {
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
                    <Timer className="text-primary" size={24} />
                  </CardContent>
                </Card>
              ))}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

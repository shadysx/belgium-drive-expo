import { View, ScrollView, Pressable } from "react-native";
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
} from "lucide-react-native";
import { router } from "expo-router";
import { useGetStats } from "~/hooks/useQuery/useStats";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetThemesWithQuestions } from "~/hooks/useQuery/useThemes";
import { ThemeWithQuestions } from "~/interfaces/theme.interface";
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
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
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
          {/* Statistics */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="flex-row gap-4"
          >
            <Card className="flex-1">
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

          <Animated.View
            entering={FadeInDown.delay(350)}
            className="flex-row gap-4"
          >
            <Pressable
              className="flex-1"
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
            >
              <Card className="flex-1 bg-primary">
                <CardContent className="p-4 items-center">
                  <Car size={24} color="white" />
                  <Text className="text-primary-foreground mt-2 font-medium">
                    Simulation d'examen
                  </Text>
                </CardContent>
              </Card>
            </Pressable>

            <Pressable
              className="flex-1"
              onPress={() =>
                router.push({
                  pathname: "/custom-quiz-settings",
                })
              }
            >
              <Card className="flex-1 bg-secondary">
                <CardContent className="p-4 items-center">
                  <Target size={24} className="text-secondary-foreground" />
                  <Text className="text-secondary-foreground mt-2 font-medium">
                    Test personnalisé
                  </Text>
                </CardContent>
              </Card>
            </Pressable>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400)}
            className="flex-row gap-4"
          >
            <Pressable
              className="flex-1"
              onPress={() => router.push("/history")}
            >
              <Card className="flex-1 bg-muted">
                <CardContent className="p-4 items-center">
                  <History size={24} className="text-muted-foreground" />
                  <Text className="text-muted-foreground mt-2 font-medium">
                    Historique
                  </Text>
                </CardContent>
              </Card>
            </Pressable>

            <Pressable className="flex-1" onPress={() => router.push("/stats")}>
              <Card className="flex-1 bg-muted">
                <CardContent className="p-4 items-center">
                  <BarChart3 size={24} className="text-muted-foreground" />
                  <Text className="text-muted-foreground mt-2 font-medium">
                    Statistiques
                  </Text>
                </CardContent>
              </Card>
            </Pressable>
          </Animated.View>

          {/* Practice Sections */}
          <Animated.View entering={FadeInDown.delay(450)}>
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
                      <Timer className="text-primary" size={24} />
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

import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Car, Play } from "lucide-react-native";
import { router } from "expo-router";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetThemesWithQuestions } from "~/hooks/useQuery/useThemes";
import { ThemeWithQuestions } from "~/interfaces/theme.interface";
import { formatName } from "~/lib/utils";
import ContrastedCardButton from "~/components/home/ContrastedCardButton";
import CardButton from "~/components/home/CardButton";
import { History, Trophy, BarChart3, Award, Target } from "~/lib/icons";
import { Header } from "~/components/home/Header";

export default function HomeScreen() {
  const { data: themes } = useGetThemesWithQuestions();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="pb-4 px-2 flex-shrink-0">
          <Header />
        </View>

        <View className="px-2 gap-4 flex-1">
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
              icon={<Target size={24} className="text-primary" />}
              text="Examen personnalisé"
              onPress={() => router.push("/custom-quiz-settings")}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400)}
            className="flex-row gap-4"
          >
            <CardButton
              icon={<History size={24} className="text-primary" />}
              text="Historique"
              onPress={() => router.push("/history")}
            />

            <CardButton
              icon={<Trophy size={24} className="text-primary" />}
              text="Trophées"
              onPress={() => router.push("/achievements")}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400)}
            className="flex-row gap-4"
          >
            <CardButton
              icon={<BarChart3 size={24} className="text-primary" />}
              text="Statistiques"
              onPress={() => router.push("/stats")}
            />

            <CardButton
              icon={<Award size={24} className="text-primary" />}
              text="Classements"
              onPress={() => router.push("/leaderboards")}
            />
          </Animated.View>

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
                        quizType: JSON.stringify(QuizType.PREDEFINED),
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

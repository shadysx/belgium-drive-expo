import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/shared/Header";
import StatsCard from "~/components/home/StatsCard";
import {
  Trophy,
  Timer,
  Target,
  Brain,
  Calendar,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useGetQuizResults } from "~/hooks/useQuery/useQuizResults";
import { isPassed } from "~/lib/utils";

export default function StatsScreen() {
  const { data } = useGetQuizResults(10000);
  const allResults = data?.pages.flatMap((page) => page.results) ?? [];

  const totalQuizzes = allResults.length;
  const totalQuestions = allResults.reduce(
    (acc, quiz) => acc + quiz.quizResultElements.length,
    0
  );
  const passedQuizzes = allResults.filter((quiz) =>
    isPassed(quiz.score, quiz.quizResultElements.length)
  ).length;
  const averageScore = totalQuizzes
    ? Math.round(
        allResults.reduce(
          (acc, quiz) =>
            acc + (quiz.score / quiz.quizResultElements.length) * 100,
          0
        ) / totalQuizzes
      )
    : 0;
  const bestStreak = allResults.reduce((acc, quiz) => {
    const passed = isPassed(quiz.score, quiz.quizResultElements.length);
    return passed ? acc + 1 : 0;
  }, 0);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="Statistiques" />

      <ScrollView className="flex-1 px-2">
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="flex-row gap-4 mb-4"
        >
          <StatsCard
            icon={<Trophy size={24} className="text-primary" />}
            value={`${averageScore}%`}
            text="Score moyen"
          />
          <StatsCard
            icon={<Target size={24} className="text-primary" />}
            value={`${passedQuizzes}/${totalQuizzes}`}
            text="Examens réussis"
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200)}
          className="flex-row gap-4 mb-4"
        >
          <StatsCard
            icon={<Brain size={24} className="text-primary" />}
            value={totalQuestions.toString()}
            text="Questions répondues"
          />
          <StatsCard
            icon={<Zap size={24} className="text-primary" />}
            value={bestStreak.toString()}
            text="Meilleure série"
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300)}
          className="flex-row gap-4"
        >
          <StatsCard
            icon={<Calendar size={24} className="text-primary" />}
            value={totalQuizzes > 0 ? "Actif" : "Débutant"}
            text="Statut"
          />
          <StatsCard
            icon={<TrendingUp size={24} className="text-primary" />}
            value={`${Math.round(
              (passedQuizzes / Math.max(totalQuizzes, 1)) * 100
            )}%`}
            text="Taux de réussite"
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

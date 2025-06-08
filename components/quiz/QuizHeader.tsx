import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Timer, Skull } from "lucide-react-native";
import { Progress } from "~/components/ui/progress";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface QuizHeaderProps {
  timeLeft: number;
  currentQuestionIndex: number;
  questionsLength: number;
  isSurvivalQuiz: boolean;
}

const QuizHeader = (props: QuizHeaderProps) => {
  const { timeLeft, currentQuestionIndex, questionsLength, isSurvivalQuiz } =
    props;

  const breathingStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.2, {
              duration: 1500,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            withTiming(1, {
              duration: 1500,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            })
          ),
          -1,
          true
        ),
      },
    ],
    opacity: withRepeat(
      withSequence(
        withTiming(0.6, {
          duration: 1500,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        withTiming(1, {
          duration: 1500,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        })
      ),
      -1,
      true
    ),
  }));

  return (
    <View>
      <Card>
        <CardContent className="p-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Animated.View
                className="bg-primary/10 p-2 rounded-lg"
                style={breathingStyle}
              >
                <Timer size={20} className="text-primary" />
              </Animated.View>
              <Text className="text-lg font-bold text-primary">
                {timeLeft}s
              </Text>
            </View>

            <View className="flex-1 ml-4">
              <View className="h-10 relative">
                <Progress
                  value={
                    isSurvivalQuiz
                      ? 100
                      : (currentQuestionIndex + 1) * (100 / questionsLength)
                  }
                  className={`absolute inset-0 h-full rounded-full border ${
                    isSurvivalQuiz ? "border-red-500/20" : "border-primary/20"
                  }`}
                  indicatorClassName={
                    isSurvivalQuiz ? "bg-red-500" : "bg-primary"
                  }
                />
                <View className="absolute inset-0 justify-center items-center">
                  {isSurvivalQuiz ? (
                    <View className="flex-row items-center gap-2">
                      <Skull size={16} className="text-white" />
                      <Text className="text-sm font-bold text-white">
                        Mode Survie
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-sm font-bold text-white">
                      Question {currentQuestionIndex + 1} sur{" "}
                      {questionsLength ?? 0}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

export default QuizHeader;

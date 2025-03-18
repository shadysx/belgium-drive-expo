import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Timer } from "lucide-react-native";
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
  score: number;
  currentQuestionIndex: number;
}

const QuizHeader = ({
  timeLeft,
  score,
  currentQuestionIndex,
}: QuizHeaderProps) => {
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
        <CardContent className="p-6">
          <View className="flex-row justify-between items-center mb-4">
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

            <Text className="text-lg font-bold">Score: {score}</Text>
          </View>

          <View className="h-10 relative">
            <Progress
              value={(currentQuestionIndex + 1) * 2.5}
              className="absolute inset-0 h-full rounded-full border border-primary/20"
              indicatorClassName="bg-primary"
            />
            <View className="absolute inset-0 justify-center items-center">
              <Text className="text-sm font-bold">
                Question {currentQuestionIndex + 1} sur 40
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

export default QuizHeader;

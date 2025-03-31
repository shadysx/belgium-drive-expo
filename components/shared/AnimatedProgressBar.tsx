import React from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface AnimatedProgressBarProps {
  duration?: number;
  height?: number;
  backgroundColor?: string;
  currentXP: number;
  gainedXP: number;
  requiredXP: number;
}

export default function AnimatedProgressBar({
  duration = 2000,
  height = 16,
  backgroundColor = "#e0e0e0",
  currentXP,
  gainedXP,
  requiredXP,
}: AnimatedProgressBarProps) {
  const progress = useSharedValue((currentXP / requiredXP) * 100);

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  React.useEffect(() => {
    const initialPercentage = (currentXP / requiredXP) * 100;
    const finalXP = currentXP + gainedXP;
    const finalPercentage = (finalXP / requiredXP) * 100;

    if (finalPercentage > 100) {
      // Animation jusqu'à 100% d'abord
      progress.value = withTiming(
        100,
        {
          duration:
            (duration * (100 - initialPercentage)) /
            (finalPercentage - initialPercentage),
        },
        (finished) => {
          if (finished) {
            // Reset et animation jusqu'au pourcentage restant
            progress.value = 0;
            progress.value = withTiming(
              ((finalXP % requiredXP) / requiredXP) * 100,
              {
                duration:
                  (duration * (finalPercentage - 100)) /
                  (finalPercentage - initialPercentage),
              }
            );
          }
        }
      );
    } else {
      // Animation normale dans le même niveau
      progress.value = withTiming(finalPercentage, {
        duration,
      });
    }
  }, [currentXP, gainedXP, requiredXP]);

  return (
    <View className="w-full px-4">
      <View
        className="w-full rounded-full overflow-hidden"
        style={{ height, backgroundColor }}
      >
        <Animated.View className="bg-primary h-full" style={animatedStyles} />
      </View>
    </View>
  );
}

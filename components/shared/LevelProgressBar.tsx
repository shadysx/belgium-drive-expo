import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

interface AnimatedProgressBarProps {
  duration?: number;
  height?: number;
  backgroundColor?: string;
  previousXP: number;
  xpGained: number;
  previousLevel: number;
  levelMap: Record<number, number>;
  onLevelUp?: () => void;
}

export default function LevelProgressBar({
  duration = 2000,
  height = 16,
  backgroundColor = "#e0e0e0",
  previousXP,
  xpGained,
  previousLevel,
  levelMap,
  onLevelUp,
}: AnimatedProgressBarProps) {
  const progress = useSharedValue(0);
  const remainingXP = useSharedValue(xpGained);
  const currentLevelRef = useSharedValue(previousLevel);

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  useEffect(() => {
    const getRequiredXPForLevel = (level: number) => {
      return levelMap[level] || Infinity;
    };

    const animateNextLevel = () => {
      const currentValue = remainingXP.value;
      const requiredXP = getRequiredXPForLevel(currentLevelRef.value);
      const currentLevelXP = previousXP % requiredXP;

      // Calculer le pourcentage initial pour le niveau actuel
      progress.value = (currentLevelXP / requiredXP) * 100;

      if (currentValue + currentLevelXP >= requiredXP) {
        // Animation jusqu'à 100%
        progress.value = withTiming(
          100,
          {
            duration: duration / 2,
          },
          (finished) => {
            if (finished) {
              if (onLevelUp) {
                runOnJS(onLevelUp)();
              }
              // Passer au niveau suivant
              currentLevelRef.value += 1;
              // Calculer l'XP restant pour le prochain niveau
              remainingXP.value = currentValue - (requiredXP - currentLevelXP);
              progress.value = 0;
              runOnJS(animateNextLevel)();
            }
          }
        );
      } else {
        // Animation finale avec le XP restant
        const finalPercentage =
          ((currentLevelXP + currentValue) / requiredXP) * 100;
        progress.value = withTiming(finalPercentage, {
          duration: duration / 2,
        });
      }
    };

    remainingXP.value = xpGained;
    currentLevelRef.value = previousLevel;
    animateNextLevel();
  }, [previousXP, xpGained, previousLevel, levelMap]);

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

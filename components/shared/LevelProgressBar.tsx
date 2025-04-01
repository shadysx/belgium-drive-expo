import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

interface AnimatedProgressBarProps {
  duration: number;
  height?: number;
  backgroundColor?: string;
  previousXP: number;
  xpGained: number;
  previousLevel: number;
  levelMap: Record<number, number>;
  onLevelUp?: () => void;
}

export default function LevelProgressBar({
  duration,
  height = 16,
  backgroundColor = "#e0e0e0",
  previousXP,
  xpGained,
  previousLevel,
  levelMap,
  onLevelUp,
}: AnimatedProgressBarProps) {
  const previousXPTemp = useSharedValue(previousXP);
  const progress = useSharedValue(0);
  const remainingXP = useSharedValue(xpGained);
  const currentLevelRef = useSharedValue(previousLevel);

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const getRequiredXPForNextLevel = (level: number) => {
    return levelMap[level + 1] || Infinity;
  };

  const animateNextLevel = () => {
    const requiredXPForNextLvl = getRequiredXPForNextLevel(
      currentLevelRef.value
    );

    const currentLevelXP = previousXPTemp.value % requiredXPForNextLvl;

    // Calculate the initial percentage for the current level
    progress.value = (currentLevelXP / requiredXPForNextLvl) * 100;

    if (remainingXP.value + currentLevelXP >= requiredXPForNextLvl) {
      // Animation until 100%
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
            // Pass to the next level
            currentLevelRef.value += 1;
            progress.value = 0;
            previousXPTemp.value = 0;

            remainingXP.value =
              remainingXP.value - (requiredXPForNextLvl - currentLevelXP);

            runOnJS(animateNextLevel)();
          }
        }
      );
    } else {
      // Final animation with the remaining XP
      if (requiredXPForNextLvl === Infinity) {
        progress.value = withTiming(100, {
          duration: duration / 2,
        });
      } else {
        const finalPercentage =
          ((currentLevelXP + remainingXP.value) / requiredXPForNextLvl) * 100;
        progress.value = withTiming(finalPercentage, {
          duration: duration / 2,
        });
      }
    }
  };

  useEffect(() => {
    remainingXP.value = xpGained; // 100XP
    currentLevelRef.value = previousLevel; // 2
    previousXPTemp.value = previousXP;
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

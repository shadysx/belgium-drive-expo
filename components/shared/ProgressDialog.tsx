import { useWindowDimensions, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Trophy, Star } from "lucide-react-native";
import LevelProgressBar from "./LevelProgressBar";
import React from "react";

interface ProgressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  previousXP: number;
  xpGained: number;
  previousLevel: number;
  newLevel: number;
  newXP: number;
}

const levelMap: Record<number, number> = {
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 600,
  7: 700,
  8: 800,
  9: 900,
  10: 1000,
};

export function ProgressDialog({
  isOpen,
  onClose,
  previousXP,
  xpGained,
  previousLevel,
  newLevel,
  newXP,
}: ProgressDialogProps) {
  const [displayedLevel, setDisplayedLevel] = useState<number>(previousLevel);
  const scale = useSharedValue(1);

  const maxLevel = Object.keys(levelMap).length;

  const handleLevelUp = () => {
    if (displayedLevel < newLevel) {
      setDisplayedLevel((prev) => prev + 1);
      scale.value = withSequence(withSpring(1.2), withSpring(1));
    }
  };

  useEffect(() => {
    if (isOpen) {
      setDisplayedLevel(previousLevel);
    }
  }, [isOpen]);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const hasLeveledUp = newLevel > previousLevel;
  const duration = 3000;
  const lastLevelDuration = ((newLevel - previousLevel) * duration) / 2;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="">
      <DialogContent className="w-[350px]">
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="items-center mb-6 mx-auto"
        >
          <View className="bg-primary/10 p-4 rounded-full mb-2 w-[90%] justify-center items-center">
            <Trophy size={32} className="text-primary" />
          </View>
          <Text className="text-2xl font-bold text-center w-[90%]">
            +{xpGained} XP Gagnés !
          </Text>
        </Animated.View>

        <Animated.View
          style={scaleStyle}
          className="flex-row items-center justify-center gap-2 mb-6"
        >
          <Text className="text-4xl font-bold">
            Niveau {displayedLevel > maxLevel ? "Max " : displayedLevel}
          </Text>
          {hasLeveledUp && displayedLevel === newLevel && (
            <Animated.View
              entering={FadeIn.delay(800)}
              className="bg-yellow-500/20 p-2 rounded-full"
            >
              <Star size={24} className="text-yellow-500" />
            </Animated.View>
          )}
        </Animated.View>

        <View className="mb-6">
          <LevelProgressBar
            previousXP={previousXP}
            xpGained={xpGained}
            previousLevel={previousLevel}
            levelMap={levelMap}
            onLevelUp={handleLevelUp}
            duration={duration}
          />
          <View className="mt-2 flex-row justify-between">
            <Text className="text-sm text-muted-foreground text-right">
              0 XP
            </Text>
            <Text className="text-sm text-muted-foreground text-right">
              {displayedLevel === 10
                ? "Niveau max"
                : `${levelMap[displayedLevel]} XP`}
            </Text>
          </View>
        </View>

        {hasLeveledUp && (
          <Animated.View
            entering={FadeInDown.delay(lastLevelDuration)}
            className="mb-6"
          >
            <Text className="text-center text-lg font-semibold">
              Vous avez atteint le niveau {newLevel} ! 🎉
            </Text>
          </Animated.View>
        )}

        <Button onPress={onClose}>
          <Text>Continuer</Text>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

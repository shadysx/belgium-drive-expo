import { View } from "react-native";
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

interface LevelProgressProps {
  isOpen: boolean;
  onClose: () => void;
  previousXP: number;
  newXP: number;
  previousLevel: number;
  newLevel: number;
  levelMap: Record<number, number>;
}

export function LevelUpDialog({
  isOpen,
  onClose,
  previousXP,
  newXP,
  previousLevel,
  newLevel,
  levelMap,
}: LevelProgressProps) {
  const [displayedLevel, setDisplayedLevel] = useState(previousLevel);
  const scale = useSharedValue(1);

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

  const xpGained = newXP - previousXP;
  const hasLeveledUp = newLevel > previousLevel;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="items-center mb-6"
        >
          <View className="bg-primary/10 p-4 rounded-full mb-2">
            <Trophy size={32} className="text-primary" />
          </View>
          <Text className="text-2xl font-bold text-center">
            +{xpGained} XP Gagnés !
          </Text>
        </Animated.View>

        <Animated.View
          style={scaleStyle}
          className="flex-row items-center justify-center gap-2 mb-6"
        >
          <Text className="text-4xl font-bold">Niveau {displayedLevel}</Text>
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
            duration={3000}
            onLevelUp={handleLevelUp}
          />
          <View className="mt-2">
            <Text className="text-sm text-muted-foreground text-right">
              {levelMap[displayedLevel + 1] || Infinity} XP
            </Text>
          </View>
        </View>

        {hasLeveledUp && (
          <Animated.View entering={FadeInDown.delay(3000)} className="mb-6">
            <Text className="text-center text-lg font-semibold">
              Félicitations ! Vous avez atteint le niveau {newLevel} ! 🎉
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

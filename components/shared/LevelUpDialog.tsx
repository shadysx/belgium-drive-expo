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
import { useEffect } from "react";
import { Trophy, Star } from "lucide-react-native";
import AnimatedProgressBar from "./AnimatedProgressBar";
import React from "react";

interface LevelProgressProps {
  isOpen: boolean;
  onClose: () => void;
  previousXP: number;
  newXP: number;
  previousLevel: number;
  newLevel: number;
  xpRequiredForNextLevel: number;
}

export function LevelUpDialog({
  isOpen,
  onClose,
  previousXP,
  newXP,
  previousLevel,
  newLevel,
  xpRequiredForNextLevel,
}: LevelProgressProps) {
  const progress = useSharedValue((previousXP / xpRequiredForNextLevel) * 100);
  const scale = useSharedValue(1);
  const [displayedLevel, setDisplayedLevel] = React.useState(previousLevel);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  useEffect(() => {
    if (isOpen) {
      setDisplayedLevel(previousLevel);
      if (newLevel > previousLevel) {
        // On attend que la barre atteigne 100% avant de changer le niveau
        setTimeout(() => {
          setDisplayedLevel(newLevel);
          scale.value = withSequence(withSpring(1.2), withSpring(1));
        }, 2000); // Ajustez ce délai en fonction de la durée de votre animation de progression
      }
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
        {/* XP Gained Animation */}
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
          <AnimatedProgressBar
            currentXP={previousXP}
            gainedXP={xpGained}
            requiredXP={xpRequiredForNextLevel}
            duration={3000}
          />
          <View className="flex-row justify-between mt-2">
            <Text className="text-sm text-muted-foreground">{newXP} XP</Text>
            <Text className="text-sm text-muted-foreground">
              {xpRequiredForNextLevel} XP
            </Text>
          </View>
        </View>

        {hasLeveledUp && (
          <Animated.View entering={FadeInDown.delay(1000)} className="mb-6">
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

import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Progress } from "~/components/ui/progress";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import Animated, {
  FadeIn,
  FadeInDown,
  withSpring,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  interpolate,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Trophy, Star } from "lucide-react-native";

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

  useEffect(() => {
    if (isOpen) {
      // Réinitialiser à l'ancienne valeur immédiatement
      progress.value = (previousXP / xpRequiredForNextLevel) * 100;

      // Attendre un peu avant de démarrer l'animation
      // Animer vers la nouvelle valeur
      progress.value = withTiming(50, {
        duration: 1500,
      });
      console.log("newXP", newXP);
      console.log("xpRequiredForNextLevel", xpRequiredForNextLevel);
      console.log("progress.value", progress.value);
      // progress.value = newXP / xpRequiredForNextLevel;

      // Animation du level up si nécessaire
      if (newLevel > previousLevel) {
        scale.value = withSequence(withSpring(1.2), withSpring(1));
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
          <Text className="text-4xl font-bold">Niveau {newLevel}</Text>
          {hasLeveledUp && (
            <Animated.View
              entering={FadeIn.delay(800)}
              className="bg-yellow-500/20 p-2 rounded-full"
            >
              <Star size={24} className="text-yellow-500" />
            </Animated.View>
          )}
        </Animated.View>

        <View className="mb-6">
          <Animated.View>
            <Progress
              value={progress.value}
              className="h-3 bg-secondary"
              indicatorClassName="bg-primary"
            />
          </Animated.View>
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

import { View, Dimensions } from "react-native";
import { Text } from "../ui/text";
import Animated, {
  SlideInDown,
  SlideOutUp,
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";
import { Trophy } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AchievementNotificationProps {
  title: string;
  description: string;
  xp: number;
}

export function AchievementNotification({
  title,
  description,
  xp,
}: AchievementNotificationProps) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      entering={SlideInUp.duration(500)}
      exiting={SlideOutUp.duration(500)}
      className="absolute left-0 right-0 bg-card border-y border-primary/20"
      style={{
        top: insets.top,
      }}
    >
      <View className="p-4 flex-row items-center gap-4">
        <View className="bg-primary/20 p-3 rounded-xl">
          <Trophy size={24} className="text-primary" />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-base text-primary mb-0.5">
            Trophée débloqué !
          </Text>
          <Text className="font-semibold text-foreground">{title}</Text>
          <Text className="text-sm text-muted-foreground mt-0.5">
            {description}
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-primary font-bold">+{xp} XP</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

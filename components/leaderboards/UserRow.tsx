import { View } from "react-native";
import { CardContent } from "../ui/card";
import { Card } from "../ui/card";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { cn } from "~/lib/utils";
import { Text } from "../ui/text";
import { getRankStyles } from "~/lib/utils/getRankStyles";

interface UserRowProps {
  user: any;
  index: number;
  scoreType: "xp" | "survival";
}

export const UserRow = ({ user, index, scoreType }: UserRowProps) => {
  const rank = index + 1;
  const styles = getRankStyles(rank);
  const score = scoreType === "xp" ? user.xp : user.survivalScore || 0;
  const scoreLabel = scoreType === "xp" ? "XP" : "";

  return (
    <Animated.View
      key={user.id}
      entering={SlideInLeft.delay(index * 100).duration(400)}
      className="mb-2"
    >
      <Card className="bg-secondary">
        <CardContent className={cn("p-3 flex-row items-center")}>
          <View
            className={`${styles?.numberBg} w-10 h-10 rounded-md items-center justify-center mr-3 border flex-row`}
          >
            <Text className={`font-bold text-white`}>{rank}</Text>
          </View>

          <View className="flex-1">
            <Text className={`font-medium ${styles?.textColor}`}>
              {user.name} {user.isCurrentUser && "(Vous)"}
            </Text>
            <Text className="text-muted-foreground text-xs">
              Niveau {user.level}
            </Text>
          </View>

          <View
            className={`flex-row items-center bg-slate-700 px-3 py-2 rounded-md border border-slate-600 `}
          >
            <Text
              className={`font-bold ${
                rank <= 3
                  ? `${
                      rank === 1
                        ? "text-yellow-400"
                        : rank === 2
                        ? "text-blue-400"
                        : "text-orange-400"
                    }`
                  : "text-white"
              }`}
            >
              {score} {scoreLabel}
            </Text>
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

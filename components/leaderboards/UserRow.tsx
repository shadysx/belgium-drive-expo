import { View } from "react-native";
import { Card, CardContent } from "../ui/card";
import { cn } from "~/lib/utils";
import { Text } from "../ui/text";
import { User } from "lucide-react-native";
import { LeaderboardType } from "~/enums/leaderboard-type.enum";
import { getPodiumCardStyle, getRankIcon } from "~/lib/utils/leaderboard.utils";

interface UserRowProps {
  user: any;
  index: number;
  leaderboardType: LeaderboardType;
}

export const UserRow = (props: UserRowProps) => {
  const { user, index, leaderboardType } = props;

  const score =
    leaderboardType === LeaderboardType.XP ? user.xp : user.survivalScore;
  const scoreLabel = leaderboardType === LeaderboardType.XP ? "XP" : "";
  const isCurrentUser = user.isCurrentUser;

  return (
    <Card className={cn("border-0 relative", getPodiumCardStyle(index))}>
      <CardContent className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            {getRankIcon(index + 1)}
            <View>
              <Text className="font-semibold text-base text-foreground">
                {user.name}
              </Text>
              <Text className="text-sm text-muted-foreground">
                #{index + 1}
              </Text>
            </View>
          </View>

          <View className="items-end flex-row gap-1">
            <Text className="text-2xl font-bold text-foreground">
              {score || 0}
            </Text>
            {scoreLabel && (
              <Text className="text-sm text-muted-foreground">
                {scoreLabel}
              </Text>
            )}
          </View>
        </View>

        {isCurrentUser && (
          <View className="absolute -top-2 -right-2 bg-primary px-2 py-1 rounded-full flex-row items-center gap-1 shadow-lg">
            <User size={12} color="white" />
            <Text className="text-white text-xs font-bold">Vous</Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
};

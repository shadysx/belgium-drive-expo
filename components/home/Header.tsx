import { View, Pressable, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { Progress } from "~/components/ui/progress";
import { Card } from "~/components/ui/card";
import { authClient } from "~/lib/auth-client";
import { HeaderMenu } from "./HeaderMenu";
import { useGetUserInfo } from "~/hooks/useQuery/useUserInfo";
import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  const session = authClient.useSession();
  const { data: userInfo } = useGetUserInfo();
  const currentLevel = userInfo?.level;
  const currentLvlXP = userInfo?.currentLvlXP;
  const xpRequiredToLevelUp = userInfo?.xpRequiredToLevelUp;

  const progress =
    xpRequiredToLevelUp > 0 ? (currentLvlXP / xpRequiredToLevelUp) * 100 : 100;
  const levelText =
    xpRequiredToLevelUp === 0
      ? "Niveau max"
      : `${currentLvlXP} / ${xpRequiredToLevelUp} XP`;

  return (
    <View className="max-h-48">
      <Card className="p-3">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <Image
              source={{
                uri: "https://github.com/shadcn.png",
              }}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-lg font-bold">
                {session?.data?.user?.name}
              </Text>
              <Text className="text-sm text-muted-foreground">
                Bienvenue sur Belgium Drive !
              </Text>
            </View>
          </View>
          <View className="absolute top-2 right-4 flex-row items-center gap-2">
            <ThemeToggle />
            <HeaderMenu />
          </View>
        </View>

        <Progress
          value={progress}
          className="h-2.5 bg-secondary"
          indicatorClassName="bg-primary"
        />
        <View className="flex-row justify-between mt-2">
          <Text className="text-sm text-muted-foreground">
            Niveau {currentLevel}
          </Text>
          <Text className="text-sm text-muted-foreground">{levelText}</Text>
        </View>
      </Card>
    </View>
  );
}

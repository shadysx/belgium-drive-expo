import { View, Pressable, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { Progress } from "~/components/ui/progress";
import { Card } from "~/components/ui/card";
import { ThemeToggle } from "~/components/ThemeToggle";
import { authClient } from "~/lib/auth-client";
import { useNavigation } from "@react-navigation/native";
import { HeaderMenu } from "./HeaderMenu";

export function Header() {
  const currentXP = 1250;
  const currentLevel = 5;
  const nextThreshold = 2000;
  const session = authClient.useSession();

  return (
    <View>
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
          <View className="flex-row items-center gap-2">
            <HeaderMenu />
          </View>
        </View>

        <Progress
          value={(currentXP / nextThreshold) * 100}
          className="h-2.5 bg-secondary"
          indicatorClassName="bg-primary"
        />
        <View className="flex-row justify-between mt-2">
          <Text className="text-sm text-muted-foreground">
            Niveau {currentLevel}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {currentXP} / {nextThreshold} XP
          </Text>
        </View>
      </Card>
    </View>
  );
}

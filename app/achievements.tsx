import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useGetUserAchievements } from "~/hooks/useQuery/useUserAchievements";
import { Header } from "~/components/shared/Header";

export default function AchievementsScreen() {
  const { data: userAchievements } = useGetUserAchievements();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="Trophées" />

      <ScrollView>
        <View className="px-2">
          <View className="gap-4">
            {userAchievements &&
              userAchievements.map((userAchievement, index) => (
                <Animated.View
                  key={userAchievement.id}
                  entering={FadeInDown.delay(index * 100)}
                >
                  <Card>
                    <CardContent className="p-4">
                      <View className="flex-row items-center gap-4">
                        {userAchievement.achievement.icon}
                        <View className="flex-1">
                          <Text className="font-medium mb-1">
                            {userAchievement.achievement.title}
                          </Text>
                          <Text className="text-sm text-muted-foreground mb-2">
                            {userAchievement.achievement.description}
                          </Text>
                          <View className="h-2 bg-muted rounded-full overflow-hidden">
                            <View
                              className={`h-full rounded-full ${
                                userAchievement.completed
                                  ? "bg-green-500"
                                  : "bg-primary"
                              }`}
                              style={{
                                width: `${
                                  (userAchievement.currentProgress /
                                    userAchievement.achievement.maxProgress) *
                                  100
                                }%`,
                              }}
                            />
                          </View>
                          <View className="flex-row justify-between mt-2">
                            <Text className="text-xs text-muted-foreground">
                              {userAchievement.currentProgress}/
                              {userAchievement.achievement.maxProgress}
                            </Text>
                            <Text className="text-xs font-medium text-primary">
                              {userAchievement.achievement.xp} XP
                            </Text>
                          </View>
                        </View>
                      </View>
                    </CardContent>
                  </Card>
                </Animated.View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

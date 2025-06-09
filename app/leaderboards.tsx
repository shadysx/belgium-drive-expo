import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/shared/Header";
import { Text } from "~/components/ui/text";
import { UserRow } from "~/components/leaderboards/UserRow";
import { useGetLeaderboards } from "~/hooks/useQuery/useLeaderboards";
import { Trophy, Skull } from "lucide-react-native";
import { Pressable } from "react-native";
import { cn } from "~/lib/utils";
import { LeaderboardType } from "~/enums/leaderboard-type.enum";

export default function LeaderboardScreen() {
  const [scoreType, setScoreType] = useState<LeaderboardType>(
    LeaderboardType.XP
  );

  const { data: leaderboards } = useGetLeaderboards();

  const getLeaderboardData = () => {
    if (!leaderboards?.global) return [];
    return scoreType === LeaderboardType.XP
      ? leaderboards.global.xp
      : leaderboards.global.survival || [];
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="Classement" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4">
          <View className="mb-6">
            <Text className="text-xl font-bold text-foreground mb-4">
              Type de classement
            </Text>

            <View className="flex-row gap-3">
              <Pressable
                className="flex-1"
                onPress={() => setScoreType(LeaderboardType.XP)}
              >
                <View
                  className={cn(
                    "min-h-[60px] px-4 py-3 rounded-xl border-2 flex-row items-center justify-center transition-all",
                    scoreType === LeaderboardType.XP
                      ? "bg-primary border-primary"
                      : "bg-card border-border"
                  )}
                >
                  <Trophy
                    size={20}
                    className={
                      scoreType === LeaderboardType.XP
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }
                  />
                  <Text
                    className={cn(
                      "font-semibold text-base ml-2",
                      scoreType === LeaderboardType.XP
                        ? "text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    Par XP
                  </Text>
                </View>
              </Pressable>

              <Pressable
                className="flex-1"
                onPress={() => setScoreType(LeaderboardType.SURVIVAL)}
              >
                <View
                  className={cn(
                    "min-h-[60px] px-4 py-3 rounded-xl border-2 flex-row items-center justify-center transition-all",
                    scoreType === LeaderboardType.SURVIVAL
                      ? "bg-red-500 border-red-500"
                      : "bg-card border-border"
                  )}
                >
                  <Skull
                    size={20}
                    className={
                      scoreType === LeaderboardType.SURVIVAL
                        ? "text-white"
                        : "text-muted-foreground"
                    }
                  />
                  <Text
                    className={cn(
                      "font-semibold text-base ml-2",
                      scoreType === LeaderboardType.SURVIVAL
                        ? "text-white"
                        : "text-foreground"
                    )}
                  >
                    Survie
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Classement */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-foreground mb-4">
              Classement global
            </Text>

            <View className="gap-3">
              {getLeaderboardData().length > 0 ? (
                getLeaderboardData().map((user, index) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    index={index}
                    leaderboardType={scoreType}
                  />
                ))
              ) : (
                <View className="min-h-[100px] items-center justify-center bg-card rounded-xl border-2 border-border">
                  <Text className="text-muted-foreground font-medium">
                    Aucune donnée disponible
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

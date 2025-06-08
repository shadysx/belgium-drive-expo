import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/shared/Header";
import { Text } from "~/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserRow } from "~/components/leaderboards/UserRow";
import { useGetLeaderboards } from "~/hooks/useQuery/useLeaderboards";
import { Card, CardContent } from "~/components/ui/card";
import { Trophy, Skull } from "lucide-react-native";
import { Pressable } from "react-native";

export default function LeaderboardScreen() {
  const [tab, setTab] = useState("global");
  const [scoreType, setScoreType] = useState<"xp" | "survival">("xp");

  const { data: leaderboards } = useGetLeaderboards();

  const getLeaderboardData = (period: "global" | "weekly" | "monthly") => {
    if (!leaderboards?.[period]) return [];
    return scoreType === "xp"
      ? leaderboards[period].xp
      : leaderboards[period].survival || [];
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-2">
      <Header title="Classement" />

      <ScrollView className="flex-1">
        <View className="flex-1 justify-center">
          {/* Filtre par type de score */}
          <View className="px-2 mb-4">
            <View className="flex-row gap-2">
              <Pressable className="flex-1" onPress={() => setScoreType("xp")}>
                <Card
                  className={`${
                    scoreType === "xp"
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card"
                  }`}
                >
                  <CardContent className="p-3">
                    <View className="flex-row items-center justify-center gap-2">
                      <Trophy
                        size={16}
                        className={
                          scoreType === "xp"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      />
                      <Text
                        className={`font-medium ${
                          scoreType === "xp"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        Par XP
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </Pressable>

              <Pressable
                className="flex-1"
                onPress={() => setScoreType("survival")}
              >
                <Card
                  className={`${
                    scoreType === "survival"
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-card"
                  }`}
                >
                  <CardContent className="p-3">
                    <View className="flex-row items-center justify-center gap-2">
                      <Skull
                        size={16}
                        className={
                          scoreType === "survival"
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }
                      />
                      <Text
                        className={`font-medium ${
                          scoreType === "survival"
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        Survie
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </Pressable>
            </View>
          </View>

          <Tabs
            value={tab}
            onValueChange={setTab}
            className="mx-auto flex-col gap-3"
          >
            <TabsList className="flex-row w-full">
              <TabsTrigger className="flex-1" value="global">
                <Text>Global</Text>
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="weekly">
                <Text>Hebdo</Text>
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="monthly">
                <Text>Mensuel</Text>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="global">
              {getLeaderboardData("global").map((user, index) => {
                return (
                  <UserRow
                    key={user.id}
                    user={user}
                    index={index}
                    scoreType={scoreType}
                  />
                );
              })}
            </TabsContent>

            <TabsContent value="weekly">
              {getLeaderboardData("weekly").length > 0 ? (
                getLeaderboardData("weekly").map((user, index) => {
                  return (
                    <UserRow
                      key={user.id}
                      user={user}
                      index={index}
                      scoreType={scoreType}
                    />
                  );
                })
              ) : (
                <Text className="text-center text-muted-foreground py-8">
                  Aucune donnée disponible
                </Text>
              )}
            </TabsContent>

            <TabsContent value="monthly">
              {getLeaderboardData("monthly").length > 0 ? (
                getLeaderboardData("monthly").map((user, index) => {
                  return (
                    <UserRow
                      key={user.id}
                      user={user}
                      index={index}
                      scoreType={scoreType}
                    />
                  );
                })
              ) : (
                <Text className="text-center text-muted-foreground py-8">
                  Aucune donnée disponible
                </Text>
              )}
            </TabsContent>
          </Tabs>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

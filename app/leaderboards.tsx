import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/shared/Header";
import { Text } from "~/components/ui/text";
import { Card, CardContent } from "~/components/ui/card";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { cn } from "~/lib/utils";

// Mock data
const mockUsers = [
  {
    id: "u1",
    name: "Thomas Dupont",
    xp: 12450,
    level: 18,
    isCurrentUser: false,
  },
  {
    id: "u2",
    name: "Julie Lemaire",
    xp: 9872,
    level: 15,
    isCurrentUser: false,
  },
  {
    id: "u3",
    name: "Marc Janssens",
    xp: 8654,
    level: 14,
    isCurrentUser: true,
  },
  {
    id: "u4",
    name: "Sophie Verlinden",
    xp: 7321,
    level: 12,
    isCurrentUser: false,
  },
  {
    id: "u5",
    name: "Luc Vermeulen",
    xp: 6543,
    level: 11,
    isCurrentUser: false,
  },
  {
    id: "u6",
    name: "Emma De Smet",
    xp: 5987,
    level: 10,
    isCurrentUser: false,
  },
  {
    id: "u7",
    name: "David Claes",
    xp: 4765,
    level: 9,
    isCurrentUser: false,
  },
  {
    id: "u8",
    name: "Laura Peeters",
    xp: 3821,
    level: 8,
    isCurrentUser: false,
  },
  {
    id: "u9",
    name: "Nicolas Maes",
    xp: 2987,
    level: 7,
    isCurrentUser: false,
  },
  {
    id: "u10",
    name: "Charlotte Willems",
    xp: 1854,
    level: 5,
    isCurrentUser: false,
  },
];

// Sort users by XP
const sortedUsers = [...mockUsers].sort((a, b) => b.xp - a.xp);

// Function to get rank styles
const getRankStyles = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        containerBg:
          "bg-slate-800/90 border border-yellow-400/50 shadow-lg shadow-yellow-400/20",
        numberBg: "bg-slate-700 border-yellow-400/50",
        nameBg: "bg-slate-700 border-yellow-400/50",
        textColor: "text-yellow-400",
      };
    case 2:
      return {
        containerBg:
          "bg-slate-800/80 border border-blue-400/30 shadow-md shadow-blue-400/10",
        numberBg: "bg-slate-700 border-blue-400/30",
        nameBg: "bg-slate-700 border-blue-400/30",
        textColor: "text-blue-400",
      };
    case 3:
      return {
        containerBg:
          "bg-slate-800/70 border border-orange-400/30 shadow-sm shadow-orange-400/10",
        numberBg: "bg-slate-700 border-orange-400/30",
        nameBg: "bg-slate-700 border-orange-400/30",
        textColor: "text-orange-400",
      };
    default:
      return {
        containerBg: (user: any) =>
          user.isCurrentUser
            ? "bg-slate-800/80 border border-cyan-500/50"
            : "bg-slate-800 border-0",
        numberBg: "bg-slate-700 border-slate-600",
        nameBg: (user: any) =>
          user.isCurrentUser
            ? "bg-cyan-900/30 border-cyan-500/30"
            : "bg-slate-700 border-slate-600",
        textColor: (user: any) =>
          user.isCurrentUser ? "text-cyan-400" : "text-white",
      };
  }
};

export default function LeaderboardScreen() {
  const [tab, setTab] = useState("global");

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Header title="Classement" />

      <ScrollView className="flex-1">
        {/* Tabs */}
        <View className="flex-row p-4 border-b border-slate-700">
          <Pressable
            className={`flex-1 items-center pb-2 ${
              tab === "global" ? "border-b-2 border-cyan-500" : ""
            }`}
            onPress={() => setTab("global")}
          >
            <View className="flex-row items-center">
              <Text
                className={`font-semibold ${
                  tab === "global" ? "text-cyan-500" : "text-white"
                }`}
              >
                Global
              </Text>
            </View>
          </Pressable>

          <Pressable
            className={`flex-1 items-center pb-2 ${
              tab === "weekly" ? "border-b-2 border-cyan-500" : ""
            }`}
            onPress={() => setTab("weekly")}
          >
            <View className="flex-row items-center">
              <Text
                className={`font-semibold ${
                  tab === "monthly" ? "text-cyan-500" : "text-white"
                }`}
              >
                Mensuel
              </Text>
            </View>
          </Pressable>
        </View>

        {/* List of all users */}
        <View className="px-4 py-6">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            const styles = getRankStyles(rank);

            return (
              <Animated.View
                key={user.id}
                entering={SlideInLeft.delay(index * 100).duration(400)}
                className={rank <= 3 ? "mb-4" : "mb-2"}
              >
                <Card
                  className={cn(
                    "overflow-hidden",
                    typeof styles.containerBg === "function"
                      ? styles.containerBg(user)
                      : styles.containerBg
                  )}
                >
                  <CardContent
                    className={cn(
                      "p-3 flex-row items-center",
                      rank === 1 ? "py-4" : rank <= 3 ? "py-3.5" : "py-3"
                    )}
                  >
                    <View
                      className={`${styles.numberBg} w-10 h-10 rounded-md items-center justify-center mr-3 border flex-row`}
                    >
                      <Text
                        className={`font-bold ${
                          typeof styles.textColor === "function"
                            ? styles.textColor(user)
                            : styles.textColor
                        }`}
                      >
                        {rank}
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text
                        className={`font-medium ${
                          typeof styles.textColor === "function"
                            ? styles.textColor(user)
                            : styles.textColor
                        }`}
                      >
                        {user.name} {user.isCurrentUser && "(Vous)"}
                      </Text>
                      <Text className="text-slate-400 text-xs">
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
                        {user.xp.toLocaleString() + " XP"}
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

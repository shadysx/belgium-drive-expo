import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/shared/Header";
import { Text } from "~/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserRow } from "~/components/leaderboards/UserRow";
import { useGetLeaderboards } from "~/hooks/useQuery/useLeaderboards";

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

export default function LeaderboardScreen() {
  const [tab, setTab] = useState("global");

  const { data: leaderboards } = useGetLeaderboards();

  return (
    <SafeAreaView className="flex-1 bg-background px-2">
      <Header title="Classement" />

      <ScrollView className="flex-1">
        <View className="flex-1 justify-center">
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
              {leaderboards?.global.map((user, index) => {
                return <UserRow key={user.id} user={user} index={index} />;
              })}
            </TabsContent>
            <TabsContent value="weekly">
              {leaderboards?.weekly.map((user, index) => {
                return <UserRow key={user.id} user={user} index={index} />;
              })}
            </TabsContent>
            <TabsContent value="monthly">
              {leaderboards?.monthly.map((user, index) => {
                return <UserRow key={user.id} user={user} index={index} />;
              })}
            </TabsContent>
          </Tabs>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

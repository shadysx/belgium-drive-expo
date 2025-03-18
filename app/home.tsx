import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { authClient } from "~/lib/auth-client";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  Car,
  Book,
  Trophy,
  Brain,
  Timer,
  History,
  LogOut,
} from "lucide-react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "~/lib/api";
import { router } from "expo-router";

export default function HomeScreen() {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {/* Header Welcome Section */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          className="p-6 bg-primary/5"
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold">
                Bonjour, {session?.user?.name || "Conducteur"} 👋
              </Text>
              <Text className="text-muted-foreground mt-1">
                Prêt pour votre session d'entraînement ?
              </Text>
            </View>
            <Button variant="ghost" size="icon" onPress={handleSignOut}>
              <LogOut size={20} className="text-muted-foreground" />
            </Button>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View className="p-6 gap-4">
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="flex-row gap-4"
          >
            <Card
              className="flex-1 bg-primary"
              onTouchStart={() => router.push("/quiz")}
            >
              <CardContent className="p-4 items-center">
                <Car size={24} color="white" />
                <Text className="text-primary-foreground mt-2 font-medium">
                  Test Rapide
                </Text>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-secondary">
              <CardContent className="p-4 items-center">
                <Book size={24} className="text-secondary-foreground" />
                <Text className="text-secondary-foreground mt-2 font-medium">
                  Révision
                </Text>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Statistics */}
          <Animated.View
            entering={FadeInDown.delay(400)}
            className="flex-row gap-4"
          >
            <Card className="flex-1" onTouchStart={() => router.push("/test")}>
              <CardContent className="p-4">
                <Trophy size={20} className="text-yellow-500" />
                <Text className="text-2xl font-bold mt-2">85%</Text>
                <Text className="text-muted-foreground text-sm">
                  Taux de réussite
                </Text>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardContent className="p-4">
                <Brain size={20} className="text-purple-500" />
                <Text className="text-2xl font-bold mt-2">247</Text>
                <Text className="text-muted-foreground text-sm">
                  Questions répondues
                </Text>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Practice Sections */}
          <Animated.View entering={FadeInDown.delay(500)}>
            <Text className="text-lg font-semibold mb-3">Catégories</Text>

            <View className="gap-3">
              <Card>
                <CardContent className="flex-row items-center p-4">
                  <View className="flex-1">
                    <Text className="font-medium">Examen Blanc</Text>
                    <Text className="text-muted-foreground text-sm">
                      50 questions • 45 minutes
                    </Text>
                  </View>
                  <Timer className="text-primary" size={24} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex-row items-center p-4">
                  <View className="flex-1">
                    <Text className="font-medium">Priorités</Text>
                    <Text className="text-muted-foreground text-sm">
                      25 questions • Thématique
                    </Text>
                  </View>
                  <Car className="text-primary" size={24} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex-row items-center p-4">
                  <View className="flex-1">
                    <Text className="font-medium">Signalisation</Text>
                    <Text className="text-muted-foreground text-sm">
                      30 questions • Panneaux
                    </Text>
                  </View>
                  <History className="text-primary" size={24} />
                </CardContent>
              </Card>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

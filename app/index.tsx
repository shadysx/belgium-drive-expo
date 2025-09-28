import { View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function LandingScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <View className="flex-1 justify-between p-6">
        <View
          className={`absolute ${
            Platform.OS === "android" ? "top-6" : "top-2"
          } right-6`}
        >
          <ThemeToggle />
        </View>
        {/* Main Content */}
        <Animated.View
          entering={FadeInDown.delay(400)}
          className="flex-1 justify-center"
        >
          <Card className="bg-card/90 rounded-3xl">
            <CardContent className="p-6 gap-4">
              <View className="gap-2">
                <Text className="text-2xl font-bold text-center">
                  Prêt à commencer ?
                </Text>
                <Text className="text-base text-center text-muted-foreground">
                  Pratiquez pour votre examen de conduite belge avec notre
                  banque de questions
                </Text>
              </View>

              <View className="flex-row justify-center gap-4 py-4">
                <View className="items-center">
                  <Text className="text-3xl font-bold text-primary">1000+</Text>
                  <Text className="text-sm text-muted-foreground">
                    Questions
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-3xl font-bold text-primary">15+</Text>
                  <Text className="text-sm text-muted-foreground">Themes</Text>
                </View>
              </View>
            </CardContent>

            <CardFooter className="flex-col gap-3 p-6 pt-0">
              <Button
                className="w-full h-12"
                onPress={() => router.push("/sign-up")}
              >
                <Text className="text-primary-foreground text-lg">
                  Commencer
                </Text>
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                onPress={() => router.push("/sign-in")}
              >
                <Text className="text-lg">J'ai déjà un compte</Text>
              </Button>
            </CardFooter>
          </Card>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(600)}
          className="items-center pb-6"
        >
          <Text className="text-muted-foreground text-sm">
            © 2025 Belgium Drive. All rights reserved.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

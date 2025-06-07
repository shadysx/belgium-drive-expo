import { View } from "react-native";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function LandingScreen() {
  return (
    <View className="flex-1 bg-gradient-to-b from-primary/20 to-primary/5">
      <View className="flex-1 justify-between p-6">
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
    </View>
  );
}

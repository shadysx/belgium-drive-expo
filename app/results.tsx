import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams, router } from "expo-router";

export default function ResultsScreen() {
  const { score } = useLocalSearchParams<{ score: string }>();
  const percentage = (Number(score) / 40) * 100;
  const passed = percentage >= 80;

  return (
    <View className="flex-1 bg-background p-6 justify-center">
      <Card>
        <CardContent className="p-6 items-center gap-6">
          <Text className="text-2xl font-bold">
            {passed ? "Félicitations ! 🎉" : "Continuez vos efforts ! 💪"}
          </Text>

          <Text className="text-4xl font-bold text-primary">
            {percentage.toFixed(0)}%
          </Text>

          <Text className="text-muted-foreground text-center">
            Vous avez obtenu {score}/40 bonnes réponses
          </Text>

          <Button className="w-full" onPress={() => router.push("/home")}>
            <Text className="text-primary-foreground">Retour à l'accueil</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}

import { Linking, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/shared/Header";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Info } from "~/lib/icons";

export default function About() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="À propos" />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-8">
          <Card className="p-4">
            <View className="flex-row items-center mb-2">
              <Info size={22} className="text-primary mr-2" />
              <Text className="text-lg font-semibold">Disclaimer</Text>
            </View>
            <Text className="text-sm text-muted-foreground leading-6">
              Cette application n’est pas affiliée au gouvernement belge et ne
              remplace pas les informations officielles. Pour les règles et
              procédures officielles, veuillez consulter les sources
              gouvernementales ci-dessous.
            </Text>
          </Card>

          <Card className="p-4">
            <Text className="text-lg font-semibold mb-2">
              Sources officielles
            </Text>
            <View className="gap-3">
              <Button
                variant="secondary"
                onPress={() =>
                  Linking.openURL(
                    "https://mobilit.belgium.be/fr/route/conduire/permis-de-conduire"
                  )
                }
              >
                <Text className="text-primary font-medium">
                  Site du SPF Mobilité et Transports (mobilit.belgium.be)
                </Text>
              </Button>
              <Button
                variant="secondary"
                onPress={() => Linking.openURL("https://mygov.be/")}
              >
                <Text className="text-primary font-medium">
                  Portail officiel mygov.be
                </Text>
              </Button>
            </View>
          </Card>

          <Card className="p-4">
            <Text className="text-lg font-semibold mb-2">Informations</Text>
            <Text className="text-sm text-muted-foreground leading-6">
              Les contenus de préparation (questions, explications,
              statistiques) sont fournis à titre informatif et pédagogique.
              Référez-vous toujours aux communications officielles pour les
              exigences, formulaires, procédures et modalités d’examen.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

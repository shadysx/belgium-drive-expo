import { View, Alert } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { authClient } from "~/lib/auth-client";
import { AlertTriangle } from "lucide-react-native";
import { Header } from "~/components/shared/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "~/lib/utils";
import { router } from "expo-router";
import { Info } from "~/lib/icons";

export default function Settings() {
  const session = authClient.useSession();
  const isPremium = true;

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            authClient.deleteUser();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <Header title="Paramètres" />

      <Card className="p-4 mb-6">
        <Text className="text-lg font-semibold mb-2">Abonnement</Text>
        <View
          className={cn(
            "p-4 rounded-md mb-4",
            isPremium
              ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20"
              : "bg-secondary/20"
          )}
        >
          {isPremium ? (
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-3 h-3 rounded-full bg-primary mr-2" />
                <Text className="text-base font-medium">
                  Status Premium actif
                </Text>
              </View>
              <Text className="text-sm text-muted-foreground mt-2">
                Merci de votre confiance ! Etant un utilisateur depuis le début
                de l'application, Vous avez accès à toutes les fonctionnalités
                premium de Belgium Drive.
              </Text>
              <View className="flex-row flex-wrap gap-2 mt-4">
                <View className="bg-background/80 px-3 py-1 rounded-full border border-border">
                  <Text className="text-sm">Accès illimité</Text>
                </View>
                <View className="bg-background/80 px-3 py-1 rounded-full border border-border">
                  <Text className="text-sm">Support prioritaire</Text>
                </View>
                <View className="bg-background/80 px-3 py-1 rounded-full border border-border">
                  <Text className="text-sm">Fonctionnalités exclusives</Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text className="text-base">Status actuel : Gratuit</Text>
              <Text className="text-sm text-muted-foreground mt-2">
                Passez à Premium pour accéder à toutes les fonctionnalités !
              </Text>
            </View>
          )}
        </View>
        {!isPremium && (
          <Button className="w-full" onPress={() => console.log("Upgrade")}>
            <Text>Passer à Premium</Text>
          </Button>
        )}
      </Card>

      {/* Mentions légales / À propos */}
      <Card className="p-4 mb-6">
        <Text className="text-lg font-semibold mb-2">À propos</Text>
        <Text className="text-sm text-muted-foreground mb-3">
          Cette application n’est pas affiliée au gouvernement belge. Consultez
          la page dédiée pour le disclaimer complet et les sources officielles.
        </Text>
        <Button onPress={() => router.push("/about")}>
          <View className="flex-row items-center">
            <Info className="text-primary-foreground mr-2" size={20} />
            <Text className="text-primary-foreground">Voir “À propos”</Text>
          </View>
        </Button>
      </Card>

      {/* Section Danger */}
      <Card className="p-4 bg-destructive/10">
        <Text className="text-lg font-semibold mb-4 text-destructive">
          Zone de danger
        </Text>
        <View className="bg-destructive/20 p-3 rounded-md mb-4">
          <View className="flex-row items-center mb-2">
            <Text className="text-destructive font-medium">Attention</Text>
          </View>
          <Text className="text-sm text-destructive/90">
            La suppression de votre compte est une action irréversible. Toutes
            vos données seront définitivement effacées.
          </Text>
        </View>
        <Button variant="destructive" onPress={handleDeleteAccount}>
          <Text>Supprimer mon compte</Text>
        </Button>
      </Card>
    </SafeAreaView>
  );
}

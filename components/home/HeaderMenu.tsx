import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Pressable, View } from "react-native";
import { cn } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { authClient } from "~/lib/auth-client";
import { useRouter } from "expo-router";
import { Settings2, LogOut, Menu, History, Info } from "~/lib/icons";

export function HeaderMenu() {
  const { signOut } = authClient;
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Pressable className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
          {({ pressed }) => (
            <View
              className={cn(
                "flex-1 aspect-square pt-0.5 justify-center items-start web:px-5",
                pressed && "opacity-70"
              )}
            >
              <Menu
                className="text-foreground mr-2"
                size={24}
                strokeWidth={1.25}
              />
            </View>
          )}
        </Pressable>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border border-border">
        <DropdownMenuGroup>
          <DropdownMenuItem onPress={() => router.push("/history")}>
            <History
              className="text-foreground mr-2"
              size={24}
              strokeWidth={1.25}
            />
            <Text className=" text-foreground mr-2">Historique</Text>
          </DropdownMenuItem>

          <DropdownMenuItem onPress={() => router.push("/settings")}>
            <Settings2
              className="text-foreground mr-2"
              size={24}
              strokeWidth={1.25}
            />
            <Text className=" text-foreground mr-2">Paramètres</Text>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => router.push("/about")}>
            <Info
              className="text-foreground mr-2"
              size={24}
              strokeWidth={1.25}
            />
            <Text className=" text-foreground mr-2">À propos</Text>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => signOut()}>
            <LogOut
              className="text-foreground mr-2"
              size={24}
              strokeWidth={1.25}
            />
            <Text className="text-foreground">Déconnexion</Text>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

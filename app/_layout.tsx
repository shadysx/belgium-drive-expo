import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { authClient } from "~/lib/auth-client";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AchievementProvider } from "~/src/contexts/achievement-notification.context";
import { ProgressDialogProvider } from "~/src/contexts/progress-dialog.context";
import mobileAds from "react-native-google-mobile-ads";

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    adapterStatuses.forEach((adapterStatus) => {
      console.log("adapterStatus", adapterStatus);
    });
  });

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const publicRoutes = ["/", "sign-in", "sign-up"];
const queryClient = new QueryClient();

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  const { data: session, isPending } = authClient.useSession();
  const segments = useSegments();

  useEffect(() => {
    if (isPending) return;
    const segment = segments[0] || "/";
    const isPublicRoute = publicRoutes.includes(segment);

    if (session && isPublicRoute) {
      router.replace("/home");
      return;
    }
    if (!session && !isPublicRoute) {
      router.replace("/sign-in");
      return;
    }
  }, [session, isPending, segments]);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <AchievementProvider>
        <ProgressDialogProvider>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
              <Stack.Screen name="sign-up" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="home" options={{ headerShown: false }} />
              <Stack.Screen name="quiz" options={{ headerShown: false }} />
              <Stack.Screen
                name="results"
                options={{ headerShown: false, title: "Résultats" }}
              />
              <Stack.Screen
                name="custom-quiz-settings"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="history" options={{ headerShown: false }} />
              <Stack.Screen
                name="quiz-view"
                options={{
                  title: "Détail de la question",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="achievements"
                options={{
                  title: "Trophées",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="settings"
                options={{
                  title: "Paramètres",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="leaderboards"
                options={{
                  title: "Classements",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="stats"
                options={{
                  title: "Statistiques",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="about"
                options={{
                  title: "À propos",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="survival-results"
                options={{
                  title: "Résultats",
                  headerShown: false,
                }}
              />
            </Stack>
          </QueryClientProvider>
        </ProgressDialogProvider>
      </AchievementProvider>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

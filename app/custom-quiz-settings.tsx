import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetThemes } from "~/hooks/useQuery/useThemes";
import { Theme } from "~/interfaces/theme.interface";
import { formatName } from "~/lib/utils";
import React, { useState } from "react";
import { Header } from "~/components/shared/Header";
import { Check } from "~/lib/icons/Check";
import { cn } from "~/lib/utils";

export default function CustomQuizSettings() {
  const insets = useSafeAreaInsets();
  const { data: themes, isLoading } = useGetThemes();

  // States
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(["all"]);

  // Quick select values
  const quickValues = [10, 20, 30, 50, 100];

  const THEMES_OPTIONS = [
    { value: "all", label: "Tous les thèmes" },
    ...(themes?.map((theme: Theme) => ({
      label: formatName(theme.name),
      value: theme.name,
    })) || []),
  ];

  const toggleTheme = (themeValue: string) => {
    if (themeValue === "all") {
      // If selecting "all", deselect others
      setSelectedThemes(["all"]);
    } else {
      setSelectedThemes((prev) => {
        // If "all" was selected, remove it
        let newThemes = prev.filter((t) => t !== "all");

        if (newThemes.includes(themeValue)) {
          // Deselect theme
          newThemes = newThemes.filter((t) => t !== themeValue);
          // If nothing selected, fallback to "all"
          if (newThemes.length === 0) {
            newThemes = ["all"];
          }
        } else {
          // Add theme
          newThemes.push(themeValue);
        }

        return newThemes;
      });
    }
  };

  const onSubmit = () => {
    const themesToSubmit = selectedThemes.includes("all")
      ? undefined
      : selectedThemes.length > 0
      ? selectedThemes
      : undefined;

    router.push({
      pathname: "/quiz",
      params: {
        quizRequest: JSON.stringify({
          length: questionCount,
          themes: themesToSubmit,
        }),
        quizType: JSON.stringify(QuizType.CUSTOM),
      },
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="hsl(var(--primary))" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="Test personnalisé" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4">
          {/* Number of questions */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-foreground mb-4">
              Nombre de questions
            </Text>

            {/* Quick select buttons */}
            <View className="flex-row gap-3 justify-between">
              {quickValues.map((value) => (
                <Pressable
                  key={value}
                  onPress={() => setQuestionCount(value)}
                  className={cn(
                    "w-16 h-12 rounded-xl border-2 transition-all items-center justify-center flex-1",
                    questionCount === value
                      ? "bg-primary border-primary"
                      : "bg-background border-border"
                  )}
                >
                  <Text
                    className={cn(
                      "font-semibold text-base",
                      questionCount === value
                        ? "text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    {value}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Theme multi-select */}
          <View>
            <Text className="text-xl font-bold text-foreground mb-4">
              Choisir des thèmes
            </Text>
            <View className="gap-3">
              {THEMES_OPTIONS.map((option) => {
                const isSelected = selectedThemes.includes(option.value);
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => toggleTheme(option.value)}
                    className={cn(
                      "min-h-[60px] px-4 py-3 rounded-xl border-2 flex-row items-center justify-between relative transition-all",
                      isSelected
                        ? "bg-primary border-primary"
                        : "bg-card border-border hover:border-primary/50"
                    )}
                  >
                    <View className="flex-1">
                      <Text
                        className={cn(
                          "font-medium text-base",
                          isSelected
                            ? "text-primary-foreground"
                            : "text-foreground"
                        )}
                        numberOfLines={2}
                      >
                        {option.label}
                      </Text>
                      {option.value === "all" && (
                        <Text
                          className={cn(
                            "text-sm mt-1",
                            isSelected
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          )}
                        >
                          Questions de tous les thèmes mélangées
                        </Text>
                      )}
                    </View>

                    {/* Checkbox indicator */}
                    <View
                      className={cn(
                        "w-6 h-6 rounded border-2 items-center justify-center ml-3",
                        isSelected
                          ? "bg-primary-foreground border-primary-foreground"
                          : "border-border"
                      )}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          className="text-primary"
                          strokeWidth={3}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-background px-6 py-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Button onPress={onSubmit} size="lg" className="h-14">
          <Text className="text-lg font-semibold">Commencer le test</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

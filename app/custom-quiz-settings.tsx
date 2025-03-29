import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, ActivityIndicator, SafeAreaView } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { QuizType } from "~/enums/quiz-type.enum";
import { useGetThemes } from "~/hooks/useQuery/useThemes";
import { Theme } from "~/interfaces/theme.interface";
import { formatName } from "~/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Header } from "~/components/shared/Header";
import { CustomQuizSettingsFormData } from "~/lib/forms/custom-quiz-settings.form";
import { customQuizSettingsFormSchema } from "~/lib/forms/custom-quiz-settings.form";
import { QUESTION_COUNTS_OPTIONS } from "~/lib/constants";
import ErrorText from "~/components/shared/ErrorText";

export default function CustomQuizSettings() {
  const insets = useSafeAreaInsets();

  const { data: themes, isLoading } = useGetThemes();

  const THEMES_OPTIONS = themes?.map((theme: Theme) => ({
    label: formatName(theme.name),
    value: theme.name,
  }));

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CustomQuizSettingsFormData>({
    resolver: yupResolver(customQuizSettingsFormSchema),
    defaultValues: {
      questionCount: QUESTION_COUNTS_OPTIONS[0],
      theme: {
        value: "all",
        label: "Tous les thèmes",
      },
    },
  });

  const onSubmit = (data: CustomQuizSettingsFormData) => {
    router.push({
      pathname: "/quiz",
      params: {
        quizRequest: JSON.stringify({
          length: parseInt(data.questionCount.value),
          theme: data.theme.value === "all" ? undefined : data.theme.value,
        }),
        quizType: JSON.stringify(QuizType.CUSTOM),
      },
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="Test personnalisé" />
      <View className="flex-1 justify-between">
        <View className="p-6">
          <View className="gap-8 bg-background">
            <View className="gap-4">
              <Text className="text-lg font-semibold">Nombre de questions</Text>
              <Controller
                control={control}
                name="questionCount"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Select
                      value={value}
                      onValueChange={(option) => {
                        if (!option) return;
                        onChange(option);
                      }}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Choisir un nombre" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="bg-white"
                        insets={{
                          top: insets.top,
                          bottom: insets.bottom + 20,
                          left: 24,
                          right: 24,
                        }}
                      >
                        <SelectGroup>
                          {QUESTION_COUNTS_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              label={option.label}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.questionCount?.message && (
                      <ErrorText errorMessage={errors.questionCount.message} />
                    )}
                  </>
                )}
              />
            </View>

            <View className="gap-4">
              <Text className="text-lg font-semibold">Thème</Text>
              <Controller
                control={control}
                name="theme"
                render={({ field: { onChange, value } }) => (
                  <Select
                    className="mt-2"
                    style={{ zIndex: 40 }}
                    value={value}
                    onValueChange={(option) => {
                      if (!option) return;
                      onChange(option);
                    }}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Choisir un thème" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-white"
                      position="popper"
                      insets={{
                        top: insets.top,
                        bottom: insets.bottom + 20,
                        left: 24,
                        right: 24,
                      }}
                    >
                      <SelectGroup>
                        <SelectItem label="Tous les thèmes" value="all" />
                        {THEMES_OPTIONS?.map(
                          (option: { label: string; value: string }) => (
                            <SelectItem
                              key={option.value}
                              label={option.label}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </View>
          </View>
        </View>

        <View className="px-6 py-8">
          <Button onPress={handleSubmit(onSubmit)} size="lg">
            <Text>Commencer le test</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

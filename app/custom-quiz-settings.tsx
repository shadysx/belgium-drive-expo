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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

const QUESTION_COUNTS_OPTIONS = [
  { label: "10 questions", value: "10" },
  { label: "20 questions", value: "20" },
  { label: "30 questions", value: "30" },
  { label: "40 questions", value: "40" },
  { label: "50 questions", value: "50" },
  { label: "60 questions", value: "60" },
  { label: "70 questions", value: "70" },
  { label: "80 questions", value: "80" },
];

const schema = yup
  .object({
    questionCount: yup.object({
      value: yup.string().required("Nombre de questions requis"),
      label: yup.string().required(),
    }),
    theme: yup.object({
      value: yup.string().required("Thème requis"),
      label: yup.string().required(),
    }),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      questionCount: QUESTION_COUNTS_OPTIONS[0],
      theme: {
        value: "all",
        label: "Tous les thèmes",
      },
    },
  });

  const onSubmit = (data: FormData) => {
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
      <View className="flex-1 justify-between">
        <View className="p-6">
          <Text className="text-4xl font-bold mb-2">Test personnalisé</Text>
          <Text className="text-muted-foreground mb-8">
            Configurez votre test selon vos besoins
          </Text>

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
                    {errors.questionCount && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.questionCount.message}
                      </Text>
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

        <View className="px-6">
          <Button onPress={handleSubmit(onSubmit)} size="lg">
            <Text className="text-primary-foreground text-lg font-semibold">
              Commencer le test
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

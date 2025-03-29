import { View } from "react-native";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { authClient } from "../lib/auth-client";
import { useState } from "react";
import { router } from "expo-router";
import LoadingButton from "~/components/shared/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { SignUpFormData, signUpFormSchema } from "~/lib/forms/sign-up.form";
import ErrorText from "~/components/shared/ErrorText";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      email: "test@mail.com",
      password: "password",
      name: "Laurent",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        {
          onError: (error) => {
            if (error.error.code === "USER_ALREADY_EXISTS") {
              setSignupError("Cet utilisateur existe déjà");
            } else {
              setSignupError("Une erreur est survenue");
            }
          },
        }
      );
      // await initializeUserAchievements.mutateAsync();
      router.replace("/home");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-secondary/30">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader>
          <Text className="text-2xl font-bold text-center">Create Account</Text>
          <Text className="text-muted-foreground text-center">
            Sign up to get started
          </Text>
        </CardHeader>

        <CardContent className="gap-4">
          <View className="gap-2">
            <Text className="text-sm text-muted-foreground">Name</Text>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    className="bg-background"
                    placeholder="Enter your name"
                  />
                  {errors.name?.message && (
                    <ErrorText errorMessage={errors.name.message} />
                  )}
                </>
              )}
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm text-muted-foreground">Email</Text>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    className="bg-background"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email?.message && (
                    <ErrorText errorMessage={errors.email.message} />
                  )}
                </>
              )}
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm text-muted-foreground">Password</Text>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    className="bg-background"
                    placeholder="Choose a password"
                    secureTextEntry
                  />
                  {errors.password?.message && (
                    <ErrorText errorMessage={errors.password.message} />
                  )}
                </>
              )}
            />
          </View>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <LoadingButton
            text="Sign Up"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
          {signupError && <ErrorText errorMessage={signupError} />}

          <Text
            className="text-sm text-muted-foreground text-center active:opacity-70"
            onPress={() => router.replace("/sign-in")}
          >
            Already have an account? Sign in
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
};

export default SignUp;

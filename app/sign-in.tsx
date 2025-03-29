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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { signInFormSchema, SignInFormData } from "~/lib/forms/sign-in.form";
import ErrorText from "~/components/shared/ErrorText";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signinError, setIsError] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "test@mail.com",
      password: "password",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onError: (error) => {
            if (error.error.code === "INVALID_EMAIL_OR_PASSWORD") {
              setIsError("Email ou mot de passe invalide");
            } else {
              setIsError("Une erreur est survenue");
            }
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-secondary/30">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader>
          <Text className="text-2xl font-bold text-center">Welcome Back</Text>
          <Text className="text-muted-foreground text-center">
            Sign in to your account
          </Text>
        </CardHeader>

        <CardContent className="gap-4">
          <View className="gap-2">
            <Text className="text-sm text-muted-foreground">Email</Text>
            <Controller
              control={control}
              name="email"
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
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    className="bg-background"
                    placeholder="Enter your password"
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
          {signinError && <ErrorText errorMessage={signinError} />}
          <LoadingButton
            text="Sign In"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />

          <Text
            className="text-sm text-muted-foreground text-center active:opacity-70"
            onPress={() => router.replace("/sign-up")}
          >
            Don't have an account? Sign up
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
};

export default SignIn;

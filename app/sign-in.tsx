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

const SignIn = () => {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("password");

  const handleSignIn = async () => {
    try {
      const session = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {},
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {}
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
            <Input
              value={email}
              onChangeText={setEmail}
              className="bg-background"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm text-muted-foreground">Password</Text>
            <Input
              value={password}
              onChangeText={setPassword}
              className="bg-background"
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <Button className="w-full" onPress={handleSignIn}>
            <Text className="text-primary-foreground">Sign In</Text>
          </Button>

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

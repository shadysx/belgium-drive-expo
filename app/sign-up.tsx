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

const SignUp = () => {
  const [email, setEmail] = useState("test@mail.com");
  const [name, setName] = useState("Laurent");
  const [password, setPassword] = useState("password");

  const handleSignUp = async () => {
    try {
      await authClient.signUp.email({
        email,
        password,
        name,
      });
    } catch {}
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
            <Input
              value={name}
              onChangeText={setName}
              className="bg-background"
              placeholder="Enter your name"
            />
          </View>

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
              placeholder="Choose a password"
              secureTextEntry
            />
          </View>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <Button className="w-full" onPress={handleSignUp}>
            <Text className="text-primary-foreground">Sign Up</Text>
          </Button>

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

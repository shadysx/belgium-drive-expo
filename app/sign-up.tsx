import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { authClient } from "../lib/auth-client";

const SignUp = () => {
  const [email, setEmail] = useState("test@mail.com");
  const [name, setName] = useState("Laurent");
  const [password, setPassword] = useState("password");

  const handleLogin = async () => {
    const res = await authClient.signUp.email({
      email,
      password,
      name,
    });
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default SignUp;

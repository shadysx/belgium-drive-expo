import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL:
    "http://192.168.0.103:3000" /* base url of your Better Auth backend. */,
  plugins: [
    expoClient({
      scheme: "belgium-drive",
      storagePrefix: "belgium-drive",
      storage: SecureStore,
    }),
  ],
});

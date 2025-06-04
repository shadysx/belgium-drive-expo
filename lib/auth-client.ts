import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { SERVER_BASE_URL } from "./constants";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: SERVER_BASE_URL,
  plugins: [
    adminClient(),
    expoClient({
      scheme: "belgium-drive",
      storagePrefix: "belgium-drive",
      storage: SecureStore,
    }),
  ],
});

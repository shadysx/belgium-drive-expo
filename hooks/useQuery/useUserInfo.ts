import { useQuery } from "@tanstack/react-query";
import { authClient } from "~/lib/auth-client";
import { SERVER_BASE_URL } from "~/lib/constants";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/user-info`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      return response.json();
    },
  });
};

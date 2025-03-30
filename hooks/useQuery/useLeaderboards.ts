import { useQuery } from "@tanstack/react-query";
import { Leaderboards } from "~/interfaces/leaderboards.interface";
import { authClient } from "~/lib/auth-client";
import { SERVER_BASE_URL } from "~/lib/constants";

export const useGetLeaderboards = () => {
  return useQuery<Leaderboards, Error>({
    queryKey: ["leaderboards"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/leaderboards`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leaderboards");
      }

      return response.json();
    },
  });
};

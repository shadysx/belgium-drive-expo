import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { authClient } from "~/lib/auth-client";
import { UserAchievement } from "~/interfaces/user-achievement.interface";

export const useGetUserAchievements = () => {
  return useQuery<UserAchievement[], Error>({
    queryKey: ["user-achievements"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/user-achievements`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      return response.json();
    },
  });
};

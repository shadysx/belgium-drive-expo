import { useQuery } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import { authClient } from "~/lib/auth-client";
import { UserAchievement } from "~/interfaces/user-achievement";

export const useGetAchievements = () => {
  return useQuery<UserAchievement[], Error>({
    queryKey: ["achievements"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/achievements`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      return response.json();
    },
  });
};

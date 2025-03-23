import { useQuery } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import { authClient } from "~/lib/auth-client";
import { QuizResult } from "~/interfaces/quiz-result.interface";

export const useGetQuizResults = () => {
  return useQuery<QuizResult[], Error>({
    queryKey: ["quizResults"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/quiz-results`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz results");
      }

      return response.json();
    },
  });
};

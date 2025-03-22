import { useQuery } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";
import { authClient } from "~/lib/auth-client";

export const useGetQuestions = () => {
  return useQuery<QuizQuestion[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/questions`, {
        headers,
      });
      console.log("response in hook", response.ok);

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      return response.json();
    },
  });
};

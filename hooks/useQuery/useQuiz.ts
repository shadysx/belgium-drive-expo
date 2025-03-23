import { useQuery } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { QuizSubmission } from "~/interfaces/dto/quiz-submission.interface";
import { QuizResult } from "~/interfaces/quiz-result.interface";
import { authClient } from "~/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { QuizRequest } from "~/interfaces/dto/quiz-request.interface";
import { QuizQuestion } from "~/interfaces/quiz-question.interface";

export const useGetQuiz = (request: QuizRequest) => {
  return useQuery({
    queryKey: ["quiz", request],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const response = await fetch(`${SERVER_BASE_URL}/api/quiz`, {
        method: "POST",
        headers: { Cookie: cookies },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz");
      }
      return response.json() as Promise<QuizQuestion[]>;
    },
  });
};

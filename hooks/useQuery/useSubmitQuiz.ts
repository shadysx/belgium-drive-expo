import { useMutation } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { QuizSubmission } from "~/interfaces/dto/quiz-submission.interface";
import { QuizResult } from "~/interfaces/quiz-result.interface";
import { authClient } from "~/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation<QuizResult, Error, QuizSubmission>({
    mutationFn: async (quizSubmission: QuizSubmission) => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/quiz-results`, {
        method: "POST",
        headers,
        body: JSON.stringify(quizSubmission),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};

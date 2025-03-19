import { useMutation } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { QuizSubmission } from "~/interfaces/dto/quiz-submission.interface";
import { QuizResult } from "~/interfaces/quiz-result.interface";

export const useSubmitQuiz = () => {
  return useMutation<QuizResult, Error, QuizSubmission>({
    mutationFn: async (quizSubmission: QuizSubmission) => {
      const response = await fetch(`${SERVER_BASE_URL}/api/quiz-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizSubmission),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      return response.json();
    },
  });
};

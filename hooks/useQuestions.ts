import { useQuery } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { Question } from "~/interfaces/question.interface";

export const useQuestions = () => {
  return useQuery<Question[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await fetch(`${SERVER_BASE_URL}/api/questions`);

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      return response.json();
    },
  });
};

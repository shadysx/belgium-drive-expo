import { useInfiniteQuery } from "@tanstack/react-query";
import { SERVER_BASE_URL } from "~/lib/constants";
import { authClient } from "~/lib/auth-client";
import { QuizResult } from "~/interfaces/quiz-result.interface";

interface PaginatedResponse {
  results: QuizResult[];
  nextCursor?: string;
  hasMore: boolean;
}

export const useGetQuizResults = (limit: number = 10) => {
  return useInfiniteQuery<PaginatedResponse, Error>({
    queryKey: ["quizResults"],
    initialPageParam: null,
    queryFn: async ({ pageParam = null }) => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };

      const url = new URL(`${SERVER_BASE_URL}/api/quiz-results`);
      url.searchParams.append("limit", String(limit));
      if (pageParam) {
        url.searchParams.append("cursor", pageParam as string);
      }

      const response = await fetch(url.toString(), {
        headers,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch quiz results");
      }

      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

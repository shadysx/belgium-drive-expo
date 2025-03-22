import { useQuery } from "@tanstack/react-query";
import { Stats } from "~/interfaces/stats.interface";
import { authClient } from "~/lib/auth-client";
import { SERVER_BASE_URL } from "~/lib/constants";

export const useGetStats = () => {
  return useQuery<Stats, Error>({
    queryKey: ["stats"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(`${SERVER_BASE_URL}/api/stats`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      return response.json();
    },
  });
};

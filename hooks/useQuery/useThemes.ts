import { useQuery } from "@tanstack/react-query";
import { Theme, ThemeWithQuestions } from "~/interfaces/theme.interface";
import { authClient } from "~/lib/auth-client";
import { SERVER_BASE_URL } from "~/lib/constants";

export const useGetThemes = () => {
  return useQuery<Theme[], Error>({
    queryKey: ["themes"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const response = await fetch(`${SERVER_BASE_URL}/api/themes`, {
        headers: {
          Cookie: cookies,
        },
      });
      return response.json();
    },
  });
};

export const useGetThemesWithQuestions = () => {
  return useQuery<ThemeWithQuestions[], Error>({
    queryKey: ["themes-with-questions"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      const response = await fetch(
        `${SERVER_BASE_URL}/api/themes/with-questions`,
        {
          headers: {
            Cookie: cookies,
          },
        }
      );
      return response.json();
    },
  });
};

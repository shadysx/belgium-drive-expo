import React from "react";
import { router } from "expo-router";
import {
  Award,
  BarChart3,
  Car,
  History,
  Target,
  Trophy,
} from "lucide-react-native";
import { QuizType } from "~/enums/quiz-type.enum";

export interface HomeCard {
  icon: React.ReactNode;
  text: string;
  isContrasted: boolean;
  onPress: () => void;
}

export const homeCards: HomeCard[] = [
  {
    icon: <Car size={24} color="white" />,
    text: "Simulation d'examen",
    isContrasted: true,
    onPress: () =>
      router.push({
        pathname: "/quiz",
        params: {
          quizRequest: JSON.stringify({
            length: 50,
          }),
          quizType: JSON.stringify(QuizType.SIMULATION),
        },
      }),
  },
  {
    icon: <Target size={24} className="text-primary" />,
    text: "Examen personnalisé",
    isContrasted: false,
    onPress: () => router.push("/custom-quiz-settings"),
  },
  {
    icon: <History size={24} className="text-primary" />,
    text: "Historique",
    isContrasted: false,
    onPress: () => router.push("/history"),
  },
  {
    icon: <Trophy size={24} className="text-primary" />,
    text: "Trophées",
    isContrasted: false,
    onPress: () => router.push("/achievements"),
  },
  {
    icon: <BarChart3 size={24} className="text-primary" />,
    text: "Statistiques",
    isContrasted: false,
    onPress: () => router.push("/stats"),
  },
  {
    icon: <Award size={24} className="text-primary" />,
    text: "Classements",
    isContrasted: false,
    onPress: () => router.push("/leaderboards"),
  },
];

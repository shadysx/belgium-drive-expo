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
import { Skull } from "~/lib/icons/Skull";
import { QuizType } from "~/enums/quiz-type.enum";

export interface HomeCard {
  icon: React.ReactNode;
  text: string;
  cn: string;
  onPress: () => void;
}

export const homeCards: HomeCard[] = [
  {
    icon: <Car size={24} color="white" />,
    text: "Simulation d'examen",
    cn: "bg-primary text-white",
    onPress: () =>
      router.push({
        pathname: "/quiz",
        params: {
          quizRequest: JSON.stringify({
            length: 50,
            quizType: QuizType.SIMULATION,
          }),
        },
      }),
  },

  {
    icon: <Skull size={24} color="white" />,
    text: "Survie",
    cn: "bg-destructive text-white",
    onPress: () =>
      router.push({
        pathname: "/quiz",
        params: {
          quizRequest: JSON.stringify({
            quizType: QuizType.SURVIVAL,
          }),
        },
      }),
  },
  {
    icon: <Target size={24} className="text-primary" />,
    text: "Examen personnalisé",
    cn: "bg-secondary",
    onPress: () => router.push("/custom-quiz-settings"),
  },
  {
    icon: <Trophy size={24} className="text-primary" />,
    text: "Trophées",
    cn: "bg-secondary",
    onPress: () => router.push("/achievements"),
  },
  {
    icon: <BarChart3 size={24} className="text-primary" />,
    text: "Statistiques",
    cn: "bg-secondary",
    onPress: () => router.push("/stats"),
  },
  {
    icon: <Award size={24} className="text-primary" />,
    text: "Classements",
    cn: "bg-secondary",
    onPress: () => router.push("/leaderboards"),
  },
];

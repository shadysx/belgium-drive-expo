import React, { createContext, useContext, useState } from "react";
import { AchievementNotification } from "~/components/achievements/achievement-notification";
import { Achievement } from "~/interfaces/achievement";

interface AchievementContextType {
  showAchievement: (achievement: Achievement) => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function AchievementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentAchievement, setCurrentAchievement] =
    useState<Achievement | null>(null);

  const showAchievement = (achievement: Achievement) => {
    setCurrentAchievement(achievement);
    setTimeout(() => {
      setCurrentAchievement(null);
    }, 5000);
  };

  return (
    <AchievementContext.Provider value={{ showAchievement }}>
      {children}
      {currentAchievement && (
        <AchievementNotification
          title={currentAchievement.title}
          description={currentAchievement.description}
          xp={currentAchievement.xp}
        />
      )}
    </AchievementContext.Provider>
  );
}

export const useAchievementNotification = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error(
      "useAchievement must be used within an AchievementProvider"
    );
  }
  return context;
};

import React, { createContext, useContext, useState } from "react";
import { ProgressDialog } from "~/components/shared/ProgressDialog";
import { ProgressData } from "~/interfaces/dto/progress-data.interface";

interface ProgressDialogContextType {
  showProgressDialog: (progressData: ProgressData) => void;
}

const ProgressDialogContext = createContext<ProgressDialogContextType | null>(
  null
);

export function ProgressDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentProgressData, setCurrentProgressData] =
    useState<ProgressData | null>(null);

  const showProgressDialog = (progressData: ProgressData) => {
    setCurrentProgressData(progressData);
  };

  return (
    <ProgressDialogContext.Provider value={{ showProgressDialog }}>
      {children}
      {currentProgressData && (
        <ProgressDialog
          isOpen={true}
          onClose={() => setCurrentProgressData(null)}
          previousXP={currentProgressData.previousXP}
          xpGained={currentProgressData.xpGained}
          previousLevel={currentProgressData.previousLevel}
          newLevel={
            currentProgressData.newLevel ?? currentProgressData.previousLevel
          }
          newXP={currentProgressData.newXP}
          // levelMap={currentProgressData.levelMap}
        />
      )}
    </ProgressDialogContext.Provider>
  );
}

export const useProgressDialog = () => {
  const context = useContext(ProgressDialogContext);
  if (!context) {
    throw new Error(
      "useProgressDialog must be used within a ProgressDialogProvider"
    );
  }
  return context;
};

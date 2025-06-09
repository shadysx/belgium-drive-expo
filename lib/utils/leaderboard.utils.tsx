import React from "react";
import { Crown, Medal, Trophy } from "lucide-react-native";

export const getPodiumCardStyle = (position: number): string => {
  switch (position) {
    case 0:
      return "bg-yellow-500/10 border-yellow-500/30 border";
    case 1:
      return "bg-gray-500/10 border-gray-500/30 border";
    case 2:
      return "bg-orange-500/10 border-orange-500/30 border";
    default:
      return "bg-card";
  }
};

export const getRankIcon = (position: number): React.ReactNode => {
  switch (position) {
    case 1:
      return <Crown size={20} className="text-yellow-500" />;
    case 2:
      return <Medal size={20} className="text-gray-400" />;
    case 3:
      return <Medal size={20} className="text-orange-500" />;
    default:
      return <Trophy size={20} className="text-muted-foreground" />;
  }
};

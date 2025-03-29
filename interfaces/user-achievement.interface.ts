import { Achievement } from "./achievement";

export interface UserAchievement {
  id: string;
  userId: string;
  currentProgress: number;
  completed: boolean;
  completedAt: Date;
  achievement: Achievement;
}

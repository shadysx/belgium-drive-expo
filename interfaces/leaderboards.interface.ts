import { Leaderboard } from "./leaderboard.interface";

export interface Leaderboards {
  global: Leaderboard;
  monthly: Leaderboard;
  weekly: Leaderboard;
}

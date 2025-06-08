import { LeaderboardRow } from "./leaderboard-row.interface";

export interface Leaderboard {
  xp: LeaderboardRow[];
  survival: LeaderboardRow[];
}

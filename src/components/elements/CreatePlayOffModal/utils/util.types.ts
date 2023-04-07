import type { TeamType } from "types/team.types";

export type GameType = {
  team1: TeamType | undefined;
  team2: TeamType | undefined;
};

export type GameKeyTypes = "team1" | "team2";

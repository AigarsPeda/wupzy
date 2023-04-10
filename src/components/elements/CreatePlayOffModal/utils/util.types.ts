import type { TeamType } from "types/team.types";

export type GameType = {
  stage: string;
  bracketNum: number;
  team1: {
    team1: TeamType | undefined;
  };
  team2: {
    team2: TeamType | undefined;
  };
};

export type GameKeyTypes = "team1" | "team2";

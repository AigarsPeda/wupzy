import z from "zod";
import {
  type PlayerType,
  type GameType,
  type TeamType,
} from "~/types/tournament.types";

export const LinkSchema = z.object({
  public: z.boolean(),
  href: z.string().url(),
  label: z.string().min(1).max(50).optional(),
});

export type HandleScoreChangTypeArgs = {
  num: number;
  teamId: string;
  gameId: string;
};

export type HandleScoreSaveTypeArgs = {
  game: GameType;
};

export type LinkType = z.infer<typeof LinkSchema>;

export const GamesScoresSchema = z.object({
  gameId: z.string(),
  teamOneId: z.string(),
  teamTwoId: z.string(),
  isSaving: z.boolean(),
  teamOneScore: z.number(),
  teamTwoScore: z.number(),
});

export type GamesScoresType = z.infer<typeof GamesScoresSchema>;

export type CreateGameType = {
  round: number;
  order: number;
  group: string;
  teamOneId: string;
  teamTwoId: string;
  tournamentId: string;
};

export type TeamsMapType = Map<string, TeamType[]>;
export type PlayersMapType = Map<string, PlayerType[]>;

export type PlayoffsTreeTeamType = {
  id: string;
  name: string;
  score: number;
  // round: number;
  // match: number;
  // game: number;
  // isEmpty: boolean;
};

// export type PlayoffsTreeMatchType = {
//   id: number;
//   name: number;
//   right: boolean;
//   left: boolean;
//   teams: PlayoffsTreeTeamType[];
// };

// export type PlayoffType = {
//   id: number;
//   name: string;
//   matches: PlayoffsTreeMatchType[];
// };

export type PlayoffPlayerType = {
  id: string;
  score: number;
  name: string;
};

export type PlayoffRoundType = {
  id: string;
  round: number;
  match: number;
  teams: PlayoffPlayerType[];
};

import { ParticipantsZodSchema, TeamZodSchema } from "types/team.types";
import { z } from "zod";

export const GameSets = z.record(
  z.string(),
  z.object({
    firstTeam: z.number(),
    secondTeam: z.number(),
  })
);

const GamesStatsUnion = z.union([GameSets, z.unknown()]);

export const GamesZodSchema = z.object({
  id: z.string(),
  group: z.string(),
  gameSet: z.number(),
  team1Id: z.string(),
  team2Id: z.string(),
  team1: TeamZodSchema,
  team2: TeamZodSchema,
  gameOrder: z.number(),
  tournamentId: z.string(),
  team1Score: z.number().nullish(),
  team2Score: z.number().nullish(),
  winners: z.array(ParticipantsZodSchema),
  tournament: z.object({
    setsInGame: z.number(),
  }),
  gameSets: GamesStatsUnion,
});

export type GameSetsType = z.infer<typeof GameSets>;

export type GamesType = z.infer<typeof GamesZodSchema>;

const GamesMapSchema = z.map(z.string(), z.array(GamesZodSchema));

export type GamesMapType = z.infer<typeof GamesMapSchema>;

export type ActivesGame = GamesType | undefined;

export type GamesOfInterestType = {
  [key: string]: {
    "1": ActivesGame;
    "0": ActivesGame;
    "-1": ActivesGame;
  };
};

export type CreateGameType = {
  first: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
  second: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
};

const zodTeamId = z.union([z.string(), z.null()]);
const zodScore = z.union([z.number(), z.null()]);
const zodTeam = z.union([TeamZodSchema, z.null()]);

export const PlayoffGamesZodSchema = z.object({
  id: z.string(),
  team1: zodTeam,
  team2: zodTeam,
  stage: z.string(),
  team1Id: zodTeamId,
  team2Id: zodTeamId,
  team1Score: zodScore,
  team2Score: zodScore,
  gameOrder: z.number(),
  // bracketNum: z.number(),
  tournamentId: z.string(),
});

export type PlayoffGamesType = z.infer<typeof PlayoffGamesZodSchema>;

const PlayoffGamesMapSchema = z.map(z.string(), z.array(PlayoffGamesZodSchema));

export type PlayoffGamesMapType = z.infer<typeof PlayoffGamesMapSchema>;

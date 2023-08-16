import z from "zod";
import { GameSets } from "~/types/tournament.types";

export const PlayOffTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number(),
});

export const PlayGameSchema = z.object({
  id: z.string(),
  match: z.number(),
  round: z.number(),
  teamOneSetScore: z.number(),
  teamTwoSetScore: z.number(),
  gameSets: GameSets.nullish(),
  winnerId: z.string().nullish(),
  teams: z.array(PlayOffTeamSchema),
});

export const PlayoffMapSchema = z.map(z.number(), z.array(PlayGameSchema));

export type PlayGameType = z.infer<typeof PlayGameSchema>;
export type PlayoffMapType = z.infer<typeof PlayoffMapSchema>;
export type PlayOffTeamType = z.infer<typeof PlayOffTeamSchema>;

export const TeamsSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  points: z.number(),
  setsWon: z.number(),
  updatedAt: z.date(),
  createdAt: z.date(),
  gamesWon: z.number(),
  tournamentId: z.string(),
});

export const PlayoffGameSchema = z.object({
  id: z.string(),
  match: z.number(),
  round: z.number(),
  updatedAt: z.date(),
  createdAt: z.date(),
  tournamentId: z.string(),
  teamTwoSetScore: z.number(),
  teamOneSetScore: z.number(),
  gameSets: GameSets.nullish(),
  winnerId: z.string().nullish(),
  teamTwo: TeamsSchema.nullish(),
  teamTwoId: z.string().nullish(),
  teamOne: TeamsSchema.nullish(),
  teamOneId: z.string().nullish(),
});

export type PlayoffGameType = z.infer<typeof PlayoffGameSchema>;
export type TeamsType = z.infer<typeof TeamsSchema>;

import z from "zod";

export const TournamentTypeEnum = z.enum(["king", "teams"]);
export type TournamentTypeType = z.infer<typeof TournamentTypeEnum>;

// Creating tournament
export const NewPlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const NewTeamsSchema = z.object({
  id: z.string(),
  name: z.string(),
  players: z.array(NewPlayerSchema),
});

export const NewTournamentSchema = z.object({
  name: z.string(),
  sets: z.number(),
  kind: TournamentTypeEnum,
  teams: z.array(NewTeamsSchema),
  king: z.object({
    players: z.array(NewPlayerSchema),
  }),
});

export type NewTeamsType = z.infer<typeof NewTeamsSchema>;
export type NewPlayerType = z.infer<typeof NewPlayerSchema>;
export type NewTournamentType = z.infer<typeof NewTournamentSchema>;

// Tournament DB
export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string(),
  teamId: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  tournamentId: z.string().nullish(),
});

export const TournamentSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.number(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  type: TournamentTypeEnum,
});

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  players: z.array(PlayerSchema),
  tournamentId: z.string().nullish(),
});

export const GameSchema = z.object({
  id: z.string(),
  order: z.number(),
  gameSets: z.any(),
  teamOne: TeamSchema,
  teamTwo: TeamSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  teamOneId: z.string(),
  teamTwoId: z.string(),
  teamOneScore: z.number(),
  teamTwoScore: z.number(),
  tournamentId: z.string().nullish(),
});

export type GameType = z.infer<typeof GameSchema>;
export type TeamType = z.infer<typeof TeamSchema>;
export type PlayerType = z.infer<typeof PlayerSchema>;
export type TournamentType = z.infer<typeof TournamentSchema>;

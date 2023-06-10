import z from "zod";

export const TournamentTypeEnum = z.enum(["king", "teams"]);

// Creating tournament
export const NewPlayerSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const NewTeamsSchema = z.object({
  id: z.number(),
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
export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  tournamentId: z.string(),
});

export const TournamentSchema = z.object({
  id: z.string(),
  name: z.string(),
  sets: z.number(),
  userId: z.string(),
  type: TournamentTypeEnum,
  teams: z.array(TeamSchema),
});

export type TeamType = z.infer<typeof TeamSchema>;
export type TournamentType = z.infer<typeof TournamentSchema>;

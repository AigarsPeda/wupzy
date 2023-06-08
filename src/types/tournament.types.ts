import z from "zod";

export const NewPlayerSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(50),
});

export const NewTeamsSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(50),
  players: z.array(NewPlayerSchema),
});

export const NewTournamentSchema = z.object({
  name: z.string().min(1).max(50),
  kind: z.enum(["king", "teams"]),
  king: z.object({
    players: z.array(NewPlayerSchema),
  }),
  teams: z.array(NewTeamsSchema),
});

export type NewTeamsType = z.infer<typeof NewTeamsSchema>;
export type NewPlayerType = z.infer<typeof NewPlayerSchema>;
export type NewTournamentType = z.infer<typeof NewTournamentSchema>;

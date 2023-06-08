import z from "zod";

export const NewTournamentSchema = z.object({
  name: z.string().min(1).max(50),
  kind: z.enum(["king", "teams"]),
});

export type NewTournamentType = z.infer<typeof NewTournamentSchema>;

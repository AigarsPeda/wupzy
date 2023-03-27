import { z } from "zod";

const TOURNAMENT_TYPES = ["KING", "TEAMS"] as const;

const TournamentTypeZodSchema = z.enum(TOURNAMENT_TYPES);

const TournamentZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  winner: z.string().nullable(),
  type: TournamentTypeZodSchema,
});

export type TournamentTypeType = z.infer<typeof TournamentTypeZodSchema>;

export type TournamentType = z.infer<typeof TournamentZodSchema>;

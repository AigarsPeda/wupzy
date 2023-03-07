import { z } from "zod";

const TournamentZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  winner: z.string().nullable(),
});

export type TournamentType = z.infer<typeof TournamentZodSchema>;

import { z } from "zod";

const TeamZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  score: z.number(),
});

const TeamsZodSchema = z.map(z.string(), z.array(TeamZodSchema));

export type TeamsByGroupType = z.infer<typeof TeamsZodSchema>;
export type TeamType = z.infer<typeof TeamZodSchema>;

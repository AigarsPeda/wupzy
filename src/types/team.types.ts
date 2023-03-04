import { z } from "zod";

const TeamZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  score: z.number(),
});

const TeamsZodSchema = z.map(z.string(), z.array(TeamZodSchema));

export type TeamType = z.infer<typeof TeamZodSchema>;
export type TeamsMapType = z.infer<typeof TeamsZodSchema>;

export type GameType = {
  first: TeamType[];
  second: TeamType[];
};

const ParticipantZodSchema = z.object({
  name: z.string(),
  group: z.string(),
  tournamentId: z.string(),
});

export type ParticipantType = z.infer<typeof ParticipantZodSchema>;

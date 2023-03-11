import { z } from "zod";

const ParticipantsZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  score: z.number(),
});

const ParticipantsMapZodSchema = z.map(
  z.string(),
  z.array(ParticipantsZodSchema)
);

export type ParticipantType = z.infer<typeof ParticipantsZodSchema>;
export type TeamsMapType = z.infer<typeof ParticipantsMapZodSchema>;

export type TeamObjType = {
  first: ParticipantType[];
  second: ParticipantType[];
};

const GamesZodSchema = z.object({
  id: z.string(),
  group: z.string(),
  gameOrder: z.number(),
  team1Score: z.number(),
  team2Score: z.number(),
  tournamentId: z.string(),
  winnerIds: z.array(z.string()).nullable(),
  participant_team_1: z.array(ParticipantsZodSchema),
  participant_team_2: z.array(ParticipantsZodSchema),
});

export type GamesType = z.infer<typeof GamesZodSchema>;

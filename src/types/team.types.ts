import { z } from "zod";

const ParticipantsZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  score: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tournamentId: z.string(),
});

const TeamZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
  tournamentId: z.string(),
  participants: z.array(ParticipantsZodSchema),
});

export type TeamType = z.infer<typeof TeamZodSchema>;

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
  team1Id: z.string(),
  team2Id: z.string(),
  team1: TeamZodSchema,
  team2: TeamZodSchema,
  gameOrder: z.number(),
  team1Score: z.number(),
  team2Score: z.number(),
  tournamentId: z.string(),
  winnerIds: z.array(z.string()).nullable(),
});

export type GamesType = z.infer<typeof GamesZodSchema>;

export type ChangeTeamsType = {
  oldGroup: string;
  newGroup: string;
  team: ParticipantType;
};

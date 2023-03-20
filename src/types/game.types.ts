import { ParticipantsZodSchema, TeamZodSchema } from "types/team.types";
import { z } from "zod";

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
  winners: z.array(ParticipantsZodSchema),
});

export type GamesType = z.infer<typeof GamesZodSchema>;

const GamesMapSchema = z.map(z.string(), z.array(GamesZodSchema));

export type GamesMapType = z.infer<typeof GamesMapSchema>;

export type ActivesGame = GamesType | undefined;

export type GamesOfInterestType = {
  [key: string]: {
    "1": ActivesGame;
    "0": ActivesGame;
    "-1": ActivesGame;
  };
};

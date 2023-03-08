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

export type ParticipantsType = z.infer<typeof ParticipantsZodSchema>;
export type TeamsMapType = z.infer<typeof ParticipantsMapZodSchema>;

export type TeamObjType = {
  first: ParticipantsType[];
  second: ParticipantsType[];
};

const GamesZodSchema = z.object({
  id: z.string(),
  group: z.string(),
  gameOrder: z.number(),
  team1Score: z.number(),
  team2Score: z.number(),
  tournamentId: z.string(),
  winnerId: z.string().nullable(),
  participant_team_1: z.array(ParticipantsZodSchema),
  participant_team_2: z.array(ParticipantsZodSchema),
});

// gameOrder: 1
// group: "A"
// id: "cleyqmnod0055slzwk59xbyfb"
// participantId: []
// participant_team_1:  [{…}, {…}]
// participant_team_2: [{…}, {…}]
// team1Score: 0
// team2Score: 0
// tournamentId: "cleyqm14g0005slzw51criwvh"
// winnerId: null

// const GamesMapZodSchema = z.map(z.string(), z.array(GamesZodSchema));

// export type GamesMapType = z.infer<typeof GamesMapZodSchema>;
export type GamesType = z.infer<typeof GamesZodSchema>;

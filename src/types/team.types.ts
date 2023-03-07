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

export type GameType = {
  first: ParticipantsType[];
  second: ParticipantsType[];
};

// const ParticipantZodSchema = z.object({
//   name: z.string(),
//   group: z.string(),
//   tournamentId: z.string(),
// });

// export type ParticipantType = z.infer<typeof ParticipantZodSchema>;

// const ParticipantZodSchema = z.object({
//   name: z.string(),
//   group: z.string(),
//   tournamentId: z.string(),
// });

// export type ParticipantType = z.infer<typeof ParticipantZodSchema>;

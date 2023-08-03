import z from "zod";

export const PlayOffTeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number(),
});

export const PlayGameSchema = z.object({
  id: z.string(),
  match: z.number(),
  round: z.number(),
  teams: z.array(PlayOffTeamSchema),
});

export type PlayGameType = z.infer<typeof PlayGameSchema>;
export type PlayOffTeamType = z.infer<typeof PlayOffTeamSchema>;

// export type PlayoffPlayerType = {
//   id: string;
//   name: string;
//   score: number;
// };

// export type PlayoffRoundType = {
//   id: string;
//   round: number;
//   match: number;
//   teams: PlayoffPlayerType[];
// };

// export type PlayoffMapType = Map<number, PlayoffRoundType[]>;

export const PlayoffMapSchema = z.map(z.number(), z.array(PlayGameSchema));
export type PlayoffMapType = z.infer<typeof PlayoffMapSchema>;

import z from "zod";
import { type GameType } from "~/types/tournament.types";

export const LinkSchema = z.object({
  public: z.boolean(),
  href: z.string().url(),
  label: z.string().min(1).max(50).optional(),
});

export type HandleScoreChangTypeArgs = {
  num: number;
  teamId: string;
  gameId: string;
};

export type HandleScoreSaveTypeArgs = {
  game: GameType;
};

export type LinkType = z.infer<typeof LinkSchema>;

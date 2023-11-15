import z from "zod";
import {
  PlayerSchema,
  TeamSchema,
  TournamentTypeEnum,
} from "~/types/tournament.types";

export const SignupLinkSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  isActive: z.boolean(),
  description: z.string(),
  type: TournamentTypeEnum,
  teams: z.array(TeamSchema),
  players: z.array(PlayerSchema),
});

export type SignupLinkType = z.infer<typeof SignupLinkSchema>;

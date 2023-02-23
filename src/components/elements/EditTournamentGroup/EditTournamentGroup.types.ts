import type { Team } from "@prisma/client";

export type TeamsByGroupType = Map<string, Team[]>;

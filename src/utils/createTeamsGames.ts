import type { Team, Participant } from "@prisma/client";
import { TRPCError } from "@trpc/server";

type IdArrayTypes = {
  id: string;
}[];

const createTeamsGames = async (
  teams: (Team & {
    participants: Participant[];
  })[],
  callback: (
    firstTeamIds: IdArrayTypes,
    secondTeamIds: IdArrayTypes,
    firstTeamId: string,
    secondTeamId: string,
    index: number
  ) => Promise<void>
) => {
  let gameOrder = 1;

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const team = teams[i];
      const team2 = teams[j];

      if (!team || !team2) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Team not found",
        });
      }

      const firstTeamIds = team.participants.map((participant) => {
        return {
          id: participant.id,
        };
      });

      const secondTeamIds = team2.participants.map((participant) => {
        return {
          id: participant.id,
        };
      });

      await callback(firstTeamIds, secondTeamIds, team.id, team2.id, gameOrder);

      gameOrder++;
    }
  }
};

export default createTeamsGames;

import type { Participant, Team } from "@prisma/client";
import { TRPCError } from "@trpc/server";

type IdArrayTypes = {
  id: string;
}[];

type FunArgs = {
  team: Team & {
    participants: Participant[];
  };
  teams: (Team & {
    participants: Participant[];
  })[];
  gameOrder?: number;
  callback: (
    firstTeamIds: IdArrayTypes,
    secondTeamIds: IdArrayTypes,
    firstTeamId: string,
    secondTeamId: string,
    gameOrder: number
  ) => Promise<void>;
};

const createGamesForOneTeam = async ({
  team,
  teams,
  callback,
  gameOrder,
}: FunArgs) => {
  let order = gameOrder || 1;

  const firstTeamIds = team.participants.map((participant) => {
    return {
      id: participant.id,
    };
  });

  for (let i = 0; i < teams.length; i++) {
    const team2 = teams[i];

    if (!team || !team2) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Team not found",
      });
    }

    const secondTeamIds = team2.participants.map((participant) => {
      return {
        id: participant.id,
      };
    });

    await callback(firstTeamIds, secondTeamIds, team.id, team2.id, order);

    order++;
  }
};

export default createGamesForOneTeam;

import type { Team, Participant } from "@prisma/client";
import { TRPCError } from "@trpc/server";

type GameType = {
  first: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
  second: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
};

const createTeamsGames = (
  teams: (Team & {
    participants: Participant[];
  })[]
  // callback: (
  //   firstTeamIds: IdArrayTypes,
  //   secondTeamIds: IdArrayTypes,
  //   firstTeamId: string,
  //   secondTeamId: string,
  //   index: number
  // ) => Promise<void>
) => {
  // const gameOrder = 1;
  const games: GameType[] = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const team = teams[i];
      const team2 = teams[j];

      if (team && team2) {
        const game = {
          first: {
            teamId: team.id,
            participants: team.participants.map((participant) => {
              return {
                id: participant.id,
              };
            }),
          },
          second: {
            teamId: team2.id,
            participants: team2.participants.map((participant) => {
              return {
                id: participant.id,
              };
            }),
          },
        };

        games.push(game);
      }
    }
  }

  return games;

  // for (let i = 0; i < teams.length; i++) {
  //   for (let j = i + 1; j < teams.length; j++) {
  // const team = teams[i];
  // const team2 = teams[j];

  //     if (!team || !team2) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Team not found",
  //       });
  //     }

  //     const games = {
  //       firstTeam:
  //     }

  //     // const firstTeamIds = team.participants.map((participant) => {
  //     //   return {
  //     //     id: participant.id,
  //     //   };
  //     // });

  //     // const secondTeamIds = team2.participants.map((participant) => {
  //     //   return {
  //     //     id: participant.id,
  //     //   };
  //     // });

  //     // await callback(firstTeamIds, secondTeamIds, team.id, team2.id, gameOrder);

  //     gameOrder++;
  //   }
  // }
};

export default createTeamsGames;

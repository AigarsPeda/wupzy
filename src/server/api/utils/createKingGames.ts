import { type Player, type Team } from "@prisma/client";
import isAnyIdTheSame from "~/utils/isAnyIdTheSame";

const createKingGames = (
  teams: (Team & {
    players: Player[];
  })[],
  tournamentId: string
) => {
  let order = 1;
  const games = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const teamOneId = teams[i]?.id;
      const teamTwoId = teams[j]?.id;

      const firstTeamsIds = teams[i]?.players.map((player) => player.id);
      const secondTeamsIds = teams[j]?.players.map((player) => player.id);

      if (
        teamOneId &&
        teamTwoId &&
        !isAnyIdTheSame(firstTeamsIds, secondTeamsIds)
      ) {
        games.push({
          teamOneId,
          teamTwoId,
          tournamentId,
          order: order++,
        });
      }
    }
  }

  return games;
};

export default createKingGames;

import { type Player, type Team } from "@prisma/client";
import { type CreateGameType } from "~/types/utils.types";
import isAnyIdTheSame from "~/utils/isAnyIdTheSame";
import shuffleArray from "~/utils/shuffleArray";

const createKingGames = (
  teams: (Team & {
    players: Player[];
  })[],
  tournamentId: string,
  round: number
) => {
  let order = 1;
  const games: CreateGameType[] = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const firstTeams = teams[i];
      const secondTeams = teams[j];

      const firstTeamsIds = firstTeams?.players.map((player) => player.id);
      const secondTeamsIds = secondTeams?.players.map((player) => player.id);

      if (
        firstTeams?.id &&
        secondTeams?.id &&
        firstTeams?.group === secondTeams?.group &&
        !isAnyIdTheSame(firstTeamsIds, secondTeamsIds)
      ) {
        games.push({
          round,
          tournamentId,
          order: order++,
          group: firstTeams?.group,
          teamOneId: firstTeams?.id,
          teamTwoId: secondTeams?.id,
        });
      }
    }
  }

  const gamesShuffle = shuffleArray(games);

  // Update the order property
  gamesShuffle.forEach((game, index) => {
    game.order = index + 1;
  });

  return gamesShuffle;
};

export default createKingGames;

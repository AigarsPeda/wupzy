import { type Player, type Team } from "@prisma/client";
import isAnyIdTheSame from "~/utils/isAnyIdTheSame";
import shuffleArray from "~/utils/shuffleArray";

type GameType = {
  round: number;
  teamOneId: string;
  teamTwoId: string;
  tournamentId: string;
  order: number;
};

const createKingGames = (
  teams: (Team & {
    players: Player[];
  })[],
  tournamentId: string,
  round: number
) => {
  let order = 1;
  const games: GameType[] = [];
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
          round,
          teamOneId,
          teamTwoId,
          tournamentId,
          order: order++,
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

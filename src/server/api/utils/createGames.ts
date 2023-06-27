import { type Team } from "@prisma/client";
import { type CreateGameType } from "~/types/utils.types";
import shuffleArray from "~/utils/shuffleArray";

const createGames = (teams: Team[], tournamentId: string, round: number) => {
  let order = 1;
  const games: CreateGameType[] = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const firstTeams = teams[i];
      const secondTeams = teams[j];

      if (
        firstTeams?.id &&
        secondTeams?.id &&
        firstTeams?.group === secondTeams?.group
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

  return gamesShuffle;
};

export default createGames;

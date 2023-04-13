import type { GameSetsType } from "types/game.types";
import isObjIsEmpty from "utils/isObjIsEmpty";

const getWinsPerTeam = (
  finishedGames: GameSetsType | null,
  firstTeamScores?: number,
  secondTeamScores?: number
) => {
  const firstScore = firstTeamScores || 0;
  const secondScore = secondTeamScores || 0;

  if (!finishedGames || isObjIsEmpty(finishedGames)) {
    return {
      firstTeamWins: firstScore > secondScore ? 1 : 0,
      secondTeamWins: firstScore < secondScore ? 1 : 0,
    };
  }

  const firstTeamWins = Object.values(finishedGames).filter(
    (set) => set?.firstTeam > set?.secondTeam
  ).length;

  const secondTeamWins = Object.values(finishedGames).filter(
    (set) => set?.firstTeam < set?.secondTeam
  ).length;

  if (firstScore > secondScore) {
    return {
      firstTeamWins: firstTeamWins + 1,
      secondTeamWins: secondTeamWins,
    };
  }

  if (firstScore < secondScore) {
    return {
      firstTeamWins: firstTeamWins,
      secondTeamWins: secondTeamWins + 1,
    };
  }

  return {
    firstTeamWins,
    secondTeamWins,
  };
};

export default getWinsPerTeam;

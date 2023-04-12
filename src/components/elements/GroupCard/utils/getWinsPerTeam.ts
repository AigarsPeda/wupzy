import type { ActivesGame, GamesType } from "types/game.types";
import { GameSets } from "types/game.types";

const getWinsPerTeam = (
  game: GamesType | ActivesGame,
  firstTeamScores?: number,
  secondTeamScores?: number
) => {
  if (!game) {
    return {
      firstTeamWins: 0,
      secondTeamWins: 0,
    };
  }

  const finishedGames = GameSets.parse(game.gameSets);
  const isBothTeams = firstTeamScores && secondTeamScores;

  if (!finishedGames) {
    return {
      firstTeamWins: 0,
      secondTeamWins: 0,
    };
  }

  const firstTeamWins = Object.values(finishedGames).filter(
    (set) => set.firstTeam > set.secondTeam
  ).length;

  const secondTeamWins = Object.values(finishedGames).filter(
    (set) => set.firstTeam < set.secondTeam
  ).length;

  if (isBothTeams && firstTeamScores > secondTeamScores) {
    return {
      firstTeamWins: firstTeamWins + 1,
      secondTeamWins,
    };
  }

  if (isBothTeams && firstTeamScores < secondTeamScores) {
    return {
      firstTeamWins,
      secondTeamWins: secondTeamWins + 1,
    };
  }

  return {
    firstTeamWins,
    secondTeamWins,
  };
};

export default getWinsPerTeam;

import type { GameSetsType } from "types/game.types";

const getWinsPerTeam = (
  finishedGames: GameSetsType | null,
  firstTeamScores?: number,
  secondTeamScores?: number
) => {
  // const finishedGames = GameSets.parse(game.gameSets);
  const isBothTeams = firstTeamScores && secondTeamScores;

  if (!finishedGames) {
    return {
      firstTeamWins: "0",
      secondTeamWins: "0",
    };
  }

  const firstTeamWins = Object.values(finishedGames).filter(
    (set) => set?.firstTeam > set?.secondTeam
  ).length;

  const secondTeamWins = Object.values(finishedGames).filter(
    (set) => set?.firstTeam < set?.secondTeam
  ).length;

  if (isBothTeams && firstTeamScores > secondTeamScores) {
    return {
      firstTeamWins: (firstTeamWins + 1).toString(),
      secondTeamWins: secondTeamWins.toString(),
    };
  }

  if (isBothTeams && firstTeamScores < secondTeamScores) {
    return {
      firstTeamWins: firstTeamWins.toString(),
      secondTeamWins: (secondTeamWins + 1).toString(),
    };
  }

  return {
    firstTeamWins: firstTeamWins.toString(),
    secondTeamWins: secondTeamWins.toString(),
  };
};

export default getWinsPerTeam;

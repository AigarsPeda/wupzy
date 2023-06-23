import { GameSets, type GameType } from "~/types/tournament.types";

type CountWinsPerTeamArgsType = {
  game: GameType | null;
  setsToWin: number;
  // finishedGames: GameSetsType;
};

const countWinsPerTeam = ({
  game,
  setsToWin,
}: // finishedGames,
CountWinsPerTeamArgsType): {
  firstTeamWins: number;
  secondTeamWins: number;
  winnerId: string | null;
  firstTeamPoints: number;
  secondTeamPoints: number;
} => {
  const finishedGames = game?.gameSets ? GameSets.parse(game.gameSets) : {};

  const firstTeamPoints = Object.values(finishedGames).reduce((acc, set) => {
    return acc + (set?.teamOne || 0);
  }, 0);

  // second team points
  const secondTeamPoints = Object.values(finishedGames).reduce((acc, set) => {
    return acc + (set?.teamTwo || 0);
  }, 0);

  const firstTeamWins = Object.values(finishedGames).filter(
    (set) => set?.teamOne > set?.teamTwo
  ).length;

  const secondTeamWins = Object.values(finishedGames).filter(
    (set) => set?.teamOne < set?.teamTwo
  ).length;

  // 1 - 0

  if (firstTeamWins === setsToWin) {
    return {
      winnerId: game?.teamOneId || null,
      firstTeamWins,
      secondTeamWins,
      firstTeamPoints,
      secondTeamPoints,
    };
  }

  if (secondTeamWins === setsToWin) {
    return {
      winnerId: game?.teamTwoId || null,
      firstTeamWins,
      secondTeamWins,
      firstTeamPoints,
      secondTeamPoints,
    };
  }

  return {
    winnerId: null,
    firstTeamWins,
    secondTeamWins,
    firstTeamPoints,
    secondTeamPoints,
  };
};

export default countWinsPerTeam;

import { type GameSetsType } from "~/types/tournament.types";

type CountWinsPerTeamArgsType = {
  setsToWin: number;
  teamOneId: string;
  teamTwoId: string;
  gameSets: GameSetsType;
};

const countWinsPerTeam = ({
  gameSets,
  setsToWin,
  teamOneId,
  teamTwoId,
}: CountWinsPerTeamArgsType): {
  firstTeamWins: number;
  secondTeamWins: number;
  winnerId: string | null;
  firstTeamPoints: number;
  secondTeamPoints: number;
} => {
  const finishedGames = gameSets || {};

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
      winnerId: teamOneId || null,
      firstTeamWins,
      secondTeamWins,
      firstTeamPoints,
      secondTeamPoints,
    };
  }

  if (secondTeamWins === setsToWin) {
    return {
      winnerId: teamTwoId || null,
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

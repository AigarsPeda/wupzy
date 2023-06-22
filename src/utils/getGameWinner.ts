import { type GameSetsType } from "~/types/tournament.types";
import { type GamesScoresType } from "~/types/utils.types";
import getWinsPerTeam from "~/utils/getWinsPerTeam";

type GameWinnerArgsType = {
  setToWin: number;
  teamTwoId: string;
  teamOneId: string;
  teamOneScore: number;
  teamTwoScore: number;
  finishedGames: GameSetsType | null;
};

const getGameWinner = ({
  setToWin,
  teamOneId,
  teamTwoId,
  teamOneScore,
  teamTwoScore,
  finishedGames,
}: GameWinnerArgsType) => {
  let winner = null;

  const { firstTeamWins, secondTeamWins } = getWinsPerTeam(
    finishedGames,
    teamOneScore,
    teamTwoScore
  );

  if (firstTeamWins >= setToWin) {
    winner = teamOneId;
  }

  if (secondTeamWins >= setToWin) {
    winner = teamTwoId;
  }

  return {
    winner,
    firstTeamWins,
    secondTeamWins,
  };
};

export default getGameWinner;

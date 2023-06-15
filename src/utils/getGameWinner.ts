import { type GameSetsType } from "~/types/tournament.types";
import { type GamesScoresType } from "~/types/utils.types";
import getWinsPerTeam from "~/utils/getWinsPerTeam";

type GameWinnerArgsType = {
  setToWin: number;
  scores: GamesScoresType;
  finishedGames: GameSetsType | null;
};

const getGameWinner = ({
  scores,
  setToWin,
  finishedGames,
}: GameWinnerArgsType) => {
  let winner = null;

  const { firstTeamWins, secondTeamWins } = getWinsPerTeam(
    finishedGames,
    scores.teamOneScore,
    scores.teamTwoScore
  );

  if (firstTeamWins >= setToWin) {
    winner = scores.teamOneId;
  }

  if (secondTeamWins >= setToWin) {
    winner = scores.teamOneId;
  }

  return {
    winner,
    firstTeamWins,
    secondTeamWins,
  };
};

export default getGameWinner;

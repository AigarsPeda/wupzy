import { GameSets } from "~/types/tournament.types";
import { type GamesScoresType } from "~/types/utils.types";
import getGameWinner from "~/utils/getGameWinner";

type CreateGameSetJson = {
  json: unknown;
  setToWin: number;
  scores: GamesScoresType;
};

const createGameSetJson = ({ json, scores, setToWin }: CreateGameSetJson) => {
  let finishedGames = json ? GameSets.parse(json) : {};
  const keys = Object.keys(finishedGames);

  const { winner, firstTeamWins, secondTeamWins } = getGameWinner({
    finishedGames,
    scores: scores,
    setToWin,
  });

  finishedGames = {
    ...finishedGames,
    [keys.length + 1]: {
      teamOne: scores.teamOneScore,
      teamTwo: scores.teamTwoScore,
    },
  };

  return {
    winner,
    finishedGames,
    firstTeamWins,
    secondTeamWins,
  };
};

export default createGameSetJson;

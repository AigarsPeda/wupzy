import { GameSets } from "~/types/tournament.types";
import getGameWinner from "~/utils/getGameWinner";

type CreateGameSetJson = {
  json: unknown;
  setToWin: number;
  teamTwoId: string;
  teamOneId: string;
  teamOneScore: number;
  teamTwoScore: number;
};

const createGameSetJson = ({
  json,
  setToWin,
  teamOneId,
  teamTwoId,
  teamOneScore,
  teamTwoScore,
}: CreateGameSetJson) => {
  let finishedGames = json ? GameSets.parse(json) : {};
  const keys = Object.keys(finishedGames);

  const { winner, firstTeamWins, secondTeamWins } = getGameWinner({
    finishedGames,
    setToWin,
    teamOneId,
    teamTwoId,
    teamOneScore,
    teamTwoScore,
  });

  finishedGames = {
    ...finishedGames,
    [keys.length + 1]: {
      teamOne: teamOneScore,
      teamTwo: teamTwoScore,
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

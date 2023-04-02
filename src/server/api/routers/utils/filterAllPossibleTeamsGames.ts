import type { CreateGameType } from "types/game.types";

const filterAllPossibleTeamsGames = (
  teamId: string,
  games: CreateGameType[]
) => {
  // get all games where teamId is in first or second
  const filteredGames = games.filter((game) => {
    const isInFirst = game.first.teamId === teamId;
    const isInSecond = game.second.teamId === teamId;

    return isInFirst || isInSecond;
  });

  return filteredGames;
};

export default filterAllPossibleTeamsGames;

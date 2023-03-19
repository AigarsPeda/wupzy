import type { GamesType } from "types/game.types";
import createGamesMap from "utils/createGamesMap";

const getGameCountPerGroup = (games: GamesType[]) => {
  const gamesMap = createGamesMap(games);

  const totalGames: {
    [key: string]: number;
  } = {};

  gamesMap.forEach((games, group) => {
    if (!games) return;

    totalGames[group] = games.length;
  });

  return totalGames;
};

export default getGameCountPerGroup;

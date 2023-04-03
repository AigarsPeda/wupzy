import type { GamesType } from "types/game.types";
import createMap from "utils/createMap";

const getGameCountPerGroup = (games: GamesType[]) => {
  const gamesMap = createMap(games);

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

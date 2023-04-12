import createMap from "utils/createMap";
import type { GroupedObjectType } from "types/util.types";

const getGameCountPerGroup = <T extends GroupedObjectType>(games: T[]) => {
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

import type { GamesType, GamesMapType } from "types/game.types";

const compareMapsGameOrder = (
  group: string,
  games1: GamesType[],
  gamesMap: GamesMapType
) => {
  const games = gamesMap.get(group);

  if (!games) return false;

  const isEdited = games.some((game, i) => {
    const g = games1[i];

    if (!g) return false;

    return game.gameOrder !== g.gameOrder;
  });

  return isEdited;
};

export default compareMapsGameOrder;

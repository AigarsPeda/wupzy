import type { GamesMapType, GamesType } from "types/game.types";

const createGamesMap = (games: GamesType[]): GamesMapType => {
  return games.reduce((acc, game) => {
    const group = game.group;
    const groupGames = acc.get(group) || [];

    groupGames.push(game);
    acc.set(group, groupGames);

    groupGames.sort((a, b) => a.gameOrder - b.gameOrder);

    return acc;
  }, new Map<string, GamesType[]>());
};

export default createGamesMap;

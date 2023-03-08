import type { GamesType } from "types/team.types";

const createGamesMap = (games: GamesType[]) => {
  return games.reduce((acc, game) => {
    const group = game.group;
    const groupGames = acc.get(group) || [];

    groupGames.push(game);
    acc.set(group, groupGames);

    return acc;
  }, new Map<string, GamesType[]>());

  // return gamesMap;
};

export default createGamesMap;

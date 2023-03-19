import createGamesMap from "utils/createGamesMap";
import type { GamesOfInterestType, GamesType } from "types/game.types";

const createGamesOfInterest = (games: GamesType[]): GamesOfInterestType => {
  const gamesMap = createGamesMap(games);

  const gamesOfInterest: GamesOfInterestType = {};

  gamesMap.forEach((games, group) => {
    if (!games) return;

    for (let i = 0; i < games.length; i++) {
      const game = games[i];

      if (!game) continue;

      if (game.winnerIds?.length === 0 && !gamesOfInterest[group]) {
        gamesOfInterest[group] = {
          "0": game,
          "1": games[i + 1] || undefined,
          "-1": games[i - 1] || undefined,
        };
      }
    }
  });

  return gamesOfInterest;
};

export default createGamesOfInterest;

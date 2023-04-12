import type { ActivesGame } from "types/game.types";
import { GameSets } from "types/game.types";
import type { GamePlayoffType } from "../components/elements/BracketsInput/utils/cratePlayoffInputMap";

const getScoredPerSet = (game: ActivesGame | GamePlayoffType) => {
  if (!game) return {};

  const finishedGames = GameSets.parse(game.gameSets);

  const finishedGamesMap = new Map<
    string,
    { firstTeam: number; secondTeam: number }
  >();

  for (const property in finishedGames) {
    const value = finishedGames[property];

    if (value) {
      finishedGamesMap.set(property, value);
    }
  }

  return { finishedGamesMap };
};

export default getScoredPerSet;

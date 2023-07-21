import { type GameType } from "~/types/tournament.types";
import getPercentagesOfFinishedGames from "~/utils/getPercentagesOfFinishedGames";

const getGamesLeft = (games: GameType[], selectedGroup: string) => {
  if (!games) {
    return 0;
  }

  return (
    games.filter((game) => game.group === selectedGroup).length -
    getPercentagesOfFinishedGames(games, selectedGroup).finishedGames.length
  );
};

export default getGamesLeft;

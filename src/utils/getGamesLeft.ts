import { type GameType } from "~/types/tournament.types";
import getPercentagesOfFinishedGames from "~/utils/getPercentagesOfFinishedGames";

const getGamesLeft = (games: GameType[], selectedGroup: string) => {
  if (!games) {
    return 0;
  }

  const length = games.filter((game) => game.group === selectedGroup).length;

  console.log("length", length, selectedGroup);

  return (
    games.filter((game) => game.group === selectedGroup).length -
    getPercentagesOfFinishedGames(games, selectedGroup).finishedGames.length
  );
};

export default getGamesLeft;

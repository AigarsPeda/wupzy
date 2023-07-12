import { type GameType } from "~/types/tournament.types";

const getPercentagesOfFinishedGames = (
  games: GameType[],
  selectedGroup: string
) => {
  if (!games) {
    return {
      progress: 0,
      finishedGames: [],
    };
  }

  const finishedGames = games.filter(
    (game) => game.winnerId && game.group === selectedGroup
  );

  const progress = Math.round((finishedGames.length / games.length) * 100);

  return {
    progress,
    finishedGames,
  };
};

export default getPercentagesOfFinishedGames;

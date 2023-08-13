import {
  type PlayoffMapType,
  type PlayoffGameType,
} from "~/types/playoff.types";

const organizePlayoffGames = (games: PlayoffGameType[]) => {
  const tree: PlayoffMapType = new Map();

  games.forEach((game) => {
    const { round } = game;

    if (!tree.has(round)) {
      tree.set(round, []);
    }

    tree.get(round)?.push({
      id: game.id,
      match: game.match,
      round: game.round,
      gameSets: game.gameSets,
      teams: [
        {
          score: 0,
          id: game.teamOne?.id || "",
          name: game.teamOne?.name || "",
        },
        {
          score: 0,
          id: game.teamTwo?.id || "",
          name: game.teamTwo?.name || "",
        },
      ],
    });
  });

  return tree;
};

export default organizePlayoffGames;

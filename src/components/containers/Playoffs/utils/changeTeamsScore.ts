import type { GamePlayoffType } from "components/elements/BracketsInput/utils/cratePlayoffInputMap";
import type { TeamType } from "types/team.types";

const changeTeamsScore = (
  num: number,
  team: TeamType,
  stage: string,
  map: Map<string, GamePlayoffType[]>
) => {
  const newMap = new Map(map);

  const games = newMap.get(stage);

  if (!games) return newMap;

  const newGames = games.map((game) => {
    if (game.team1 && game.team1.team1.id === team.id) {
      return {
        ...game,
        team1: {
          ...game.team1,
          team1Score: num,
        },
      };
    }

    if (game.team2 && game.team2.team2.id === team.id) {
      return {
        ...game,
        team2: {
          ...game.team2,
          team2Score: num,
        },
      };
    }

    return game;
  });

  newMap.set(stage, newGames);

  return newMap;
};

export default changeTeamsScore;

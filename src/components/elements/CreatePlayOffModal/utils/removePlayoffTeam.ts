import type { GameType } from "components/elements/CreatePlayOffModal/utils/util.types";
import type { TeamType } from "types/team.types";

const removePlayoffTeam = (
  team: TeamType,
  brackets: Map<string, GameType[]>
) => {
  const newMap = new Map(brackets);

  newMap.forEach((games, key) => {
    const newGameArray = games.map((game) => {
      if (game.team1?.team1?.id === team.id) {
        return {
          ...game,
          team1: {
            team1: undefined,
          },
        };
      }

      if (game.team2?.team2?.id === team.id) {
        return {
          ...game,
          team2: {
            team2: undefined,
          },
        };
      }

      return game;
    });

    newMap.set(key, newGameArray);
  });

  return newMap;
};

export default removePlayoffTeam;

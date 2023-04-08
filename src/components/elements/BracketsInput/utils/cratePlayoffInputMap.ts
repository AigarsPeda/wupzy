import type { PlayoffGamesType } from "types/game.types";
import type { TeamType } from "types/team.types";

export type GameType = {
  team1: TeamType | undefined;
  team2: TeamType | undefined;
};

const cratePlayoffInputMap = (map: Map<string, PlayoffGamesType[]>) => {
  const keys = Array.from(map.keys()).sort();
  const originalNum = parseInt(keys[keys.length - 1] || "0");
  let num = originalNum;

  const selected: TeamType[] = [];
  const playoffMap = new Map<string, GameType[]>();

  while (num > 0) {
    const arr = Array.from(Array(num).keys()).map((n) => {
      const group = map.get(num.toString()) || [];
      const game = group[n];

      const g: GameType = {
        team1: undefined,
        team2: undefined,
      };

      if (game?.team1 && game?.team1 !== null) {
        g.team1 = game?.team1;
      }
      if (game?.team2 && game?.team2 !== null) {
        g.team2 = game?.team2;
      }

      return g;
    });

    playoffMap.set(`${num}`, arr);

    num = Math.floor(num / 2);
  }

  return { playoffMap, selected };
};

export default cratePlayoffInputMap;

import type { PlayoffGamesType } from "types/game.types";
import type { TeamType } from "types/team.types";

export type GameType = {
  team1: TeamType | undefined;
  team2: TeamType | undefined;
};

type NextRoundType = {
  group: string;
  position: number;
  team1?: TeamType;
  team2?: TeamType;
};

const cratePlayoffInputMap = (map: Map<string, PlayoffGamesType[]>) => {
  const keys = Array.from(map.keys()).sort();
  const originalNum = parseInt(keys[keys.length - 1] || "0");
  let num = originalNum;

  const autoMoveToNextRound: NextRoundType[] = [];
  const playoffMap = new Map<string, GameType[]>();

  while (num > 0) {
    const arr = Array.from(Array(num).keys()).map((n) => {
      const group = map.get(num.toString()) || [];
      const nextRound = Math.round(num / 2).toString();

      console.log("nextRound", nextRound, n);

      const game = group[n];
      const team1 = game?.team1;
      const team2 = game?.team2;

      const g: GameType = {
        team1: undefined,
        team2: undefined,
      };

      if (team1) {
        g.team1 = team1;
      }

      if (team2) {
        g.team2 = team2;
      }

      if (!team2 && team1) {
        autoMoveToNextRound.push({
          group: nextRound,
          team1,
          position: Math.floor(n / 2),
        });
      }

      if (!team1 && team2) {
        autoMoveToNextRound.push({
          group: nextRound,
          team2,

          position: Math.floor(n / 2),
        });
      }

      return g;
    });

    playoffMap.set(`${num}`, arr);

    num = Math.floor(num / 2);
  }

  for (let i = 0; i < autoMoveToNextRound.length; i++) {
    const game = autoMoveToNextRound[i];

    console.log("game", game);

    if (!game) continue;

    const group = playoffMap.get(game.group) || [];
    const g = group[game.position];

    if (g && game.team2) {
      g.team2 = game.team2;
    }

    if (g && game.team1) {
      g.team1 = game.team1;
    }
  }

  return { playoffMap };
};

export default cratePlayoffInputMap;

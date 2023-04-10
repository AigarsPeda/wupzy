import type { PlayoffGamesType } from "types/game.types";
import type { TeamType } from "types/team.types";

export type GamePlayoffType = {
  stage: string;
  gameId: string;
  bracketNum: number;
  team1?: {
    team1: TeamType;
    team1Score: number | null;
  };
  team2?: {
    team2: TeamType;
    team2Score: number | null;
  };
};

export type NextRoundType = {
  stage: string;
  gameId: string;
  team: TeamType;
  bracketNum: number;
};

const cratePlayoffInputMap = (map: Map<string, PlayoffGamesType[]>) => {
  const keys = Array.from(map.keys()).sort();

  console.log("map --->", map);

  // 6, 3, 1
  const originalNum = parseInt(keys[keys.length - 1] || "0");
  let num = originalNum;

  const autoMoveToNextRound: NextRoundType[] = [];
  const playoffMap = new Map<string, GamePlayoffType[]>();

  while (num > 0) {
    const arr = Array.from(Array(num).keys()).map((n) => {
      const group = map.get(num.toString()) || [];

      console.log("group --->", group);

      // const nextRound = Math.round(num / 2).toString();

      const game = group[n];

      const team1 = game?.team1;
      const team2 = game?.team2;
      // const bracketNum = game?.bracketNum || n;

      const g: GamePlayoffType = {
        bracketNum: game?.bracketNum || 0,
        gameId: game?.id || "",
        stage: num.toString() || "",
      };

      // insert g into bracketNum position in array

      if (team1) {
        g.team1 = {
          team1,
          team1Score: game?.team1Score,
        };
      }

      if (team2) {
        g.team2 = {
          team2,
          team2Score: game?.team2Score,
        };
      }

      // If there are no anther team move to next round to first position
      // if (!team2 && team1 && num === originalNum) {
      //   autoMoveToNextRound.push({
      //     team: team1,
      //     gameId: game?.id || "",
      //     stage: Math.round(num / 2).toString(),
      //     bracketNum: Math.floor(n / 2),
      //   });
      // }

      // if (!team1 && team2 && num === originalNum) {
      //   autoMoveToNextRound.push({
      //     team: team2,
      //     gameId: game?.id || "",
      //     stage: Math.round(num / 2).toString(),
      //     bracketNum: Math.floor(n / 2),
      //   });
      // }

      return g;
    });

    // arr.sort((a, b) => a.bracketNum - b.bracketNum);

    playoffMap.set(`${num}`, arr);

    num = Math.floor(num / 2);
  }

  for (let i = 0; i < autoMoveToNextRound.length; i++) {
    const game = autoMoveToNextRound[i];

    if (!game) continue;

    const group = playoffMap.get(game?.stage) || [];

    const g = group.find((g) => g.bracketNum === game.bracketNum);

    if (g && game.team) {
      g.team1 = {
        team1: game.team,
        team1Score: null,
      };
    }
  }

  return { playoffMap, autoMoveToNextRound };
};

export default cratePlayoffInputMap;

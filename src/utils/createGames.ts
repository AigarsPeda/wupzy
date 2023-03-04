import type { TeamType } from "types/team.types";
import containsParticipants from "utils/containsParticipants";

type GameType = {
  first: TeamType[];
  second: TeamType[];
};

const createGames = (pairs: Map<string, TeamType[][]>) => {
  const games = new Map<string, GameType[]>([]);

  for (const group of pairs.keys()) {
    const teams = pairs.get(group);

    if (!teams) return games;

    const allPossiblePairs = teams;

    for (let i = 0; i < allPossiblePairs.length; i++) {
      const firstPair = allPossiblePairs[i];

      if (!firstPair) return games;

      for (let j = i + 1; j < allPossiblePairs.length; j++) {
        const secondPair = allPossiblePairs[j];

        if (!secondPair || !firstPair[0] || !firstPair[1]) return games;

        if (
          !containsParticipants(firstPair[0], secondPair) &&
          !containsParticipants(firstPair[1], secondPair)
        ) {
          const game: GameType = {
            first: firstPair,
            second: secondPair,
          };

          const test = games.get(group);

          if (test) {
            test.push(game);
            break;
          }

          games.set(group, [game]);
        }
      }
    }
  }

  // console.log("games", games);

  return games;
};

export default createGames;

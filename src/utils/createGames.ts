import type { ParticipantType } from "types/team.types";
import containsParticipants from "utils/containsParticipants";

type TeamObjType = {
  first: ParticipantType[];
  second: ParticipantType[];
};

const createGames = (
  pairs: Map<string, ParticipantType[][]>,
  newParticipant?: ParticipantType
) => {
  const games = new Map<string, TeamObjType[]>([]);
  const filteredPairs: TeamObjType[] = [];

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
          const game: TeamObjType = {
            first: firstPair,
            second: secondPair,
          };

          const teams = games.get(group);

          if (teams) {
            teams.push(game);
            break;
          }

          games.set(group, [game]);
        }
      }
    }

    if (newParticipant) {
      const g = games.get(group);

      if (!g) return games;

      for (let i = 0; i < g.length; i++) {
        const gm = g[i];

        if (!gm) return games;

        for (const key in gm) {
          const k = key as keyof typeof gm;
          const element = gm[k];

          if (!element) return games;

          if (isParticipantGames(newParticipant, element)) {
            filteredPairs.push(gm);
          }
        }
      }

      games.set(group, filteredPairs);
    }
  }

  return games;
};

export default createGames;

const isParticipantGames = (
  participant: ParticipantType,
  games: ParticipantType[]
) => {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    if (!game) return false;

    if (game.id === participant.id) return true;
  }

  return false;
};

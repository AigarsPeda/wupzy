import type { ParticipantType } from "types/team.types";

type ParticipantObjType = {
  first: {
    id: string;
  }[];
  second: {
    id: string;
  }[];
};

const createAllPossibleKingGames = (participants: ParticipantType[]) => {
  const allPossiblePairs: ParticipantType[][] = [];
  const allGamesWithParticipants: ParticipantObjType[] = [];

  // const groupPairs = new Map<string, ParticipantType[][]>([]);

  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const player1 = participants[i];
      const player2 = participants[j];

      // if (!player1 || !player2) return groupPairs;

      if (player1 && player2) {
        allPossiblePairs.push([player1, player2]);
      }
    }
  }

  // groupPairs.set(group, allPossiblePairs);

  for (let i = 0; i < allPossiblePairs.length; i++) {
    for (let j = i + 1; j < allPossiblePairs.length; j++) {
      const pair1 = allPossiblePairs[i];
      const pair2 = allPossiblePairs[j];

      if (pair1 && pair2) {
        const isPair1InPair2 = pair2.some((participant) => {
          const id = participant.id;

          return pair1.some((p) => p.id === id);
        });

        if (!isPair1InPair2) {
          const game: ParticipantObjType = {
            first: pair1.map((p) => {
              return { id: p.id };
            }),
            second: pair2.map((p) => {
              return { id: p.id };
            }),
          };

          allGamesWithParticipants.push(game);
        }
      }
    }
  }

  return allGamesWithParticipants;
};

export default createAllPossibleKingGames;

// 1 - 1 ->  1 - 2  1 - 3  1 - 4
// 2 - 2 ->  2 - 3  2 - 4
// 3 - 3 ->  3 - 4
// 4 - 4

// [1 - 2,  1 - 3,  1 - 4, 2 - 3,  2 - 4,  3 - 4]

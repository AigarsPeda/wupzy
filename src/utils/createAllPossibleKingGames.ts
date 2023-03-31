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

  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const player1 = participants[i];
      const player2 = participants[j];

      if (player1 && player2) {
        allPossiblePairs.push([player1, player2]);
      }
    }
  }

  // create all possible games with unique participants in each game
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

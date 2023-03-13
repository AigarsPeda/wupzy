import type { Participant } from "@prisma/client";
import type { OldGamesType } from "server/api/routers/utils/isGameAlreadyCreated";
import isGameAlreadyCreated from "server/api/routers/utils/isGameAlreadyCreated";
import type { ParticipantType } from "types/team.types";

const createAllNewPairsInGroup = (
  participants: Participant[],
  group: string,
  oldGames: OldGamesType[]
) => {
  const groupPairs = new Map<string, ParticipantType[][]>([]);
  const newGames: ParticipantType[][] = [];

  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const player1 = participants[i];
      const player2 = participants[j];

      if (
        player1 &&
        player2 &&
        !isGameAlreadyCreated(player1.id, player2.id, oldGames)
      ) {
        newGames.push([player1, player2]);
      }
    }
  }

  groupPairs.set(group, newGames);

  return groupPairs;
};

export default createAllNewPairsInGroup;

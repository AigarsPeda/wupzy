import type { ParticipantType } from "types/team.types";

const createAllPossiblePairsInGroup = (
  participants: ParticipantType[],
  group: string
) => {
  const allPossiblePairs: ParticipantType[][] = [];
  const groupPairs = new Map<string, ParticipantType[][]>([]);

  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const player1 = participants[i];
      const player2 = participants[j];

      if (!player1 || !player2) return groupPairs;

      allPossiblePairs.push([player1, player2]);
    }
  }

  groupPairs.set(group, allPossiblePairs);

  return groupPairs;
};

export default createAllPossiblePairsInGroup;

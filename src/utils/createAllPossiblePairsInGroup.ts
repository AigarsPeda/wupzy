import type { ParticipantType } from "types/team.types";
import createParticipantMap from "utils/createParticipantMap";

const createAllPossiblePairsInGroup = (participants: ParticipantType[]) => {
  const participantsMap = createParticipantMap(participants);
  const groupPairs = new Map<string, ParticipantType[][]>([]);
  for (const group of participantsMap.keys()) {
    console.log("group --->", group);

    const participants = participantsMap.get(group);
    const allPossiblePairs: ParticipantType[][] = [];

    if (!participants) return groupPairs;

    for (let i = 0; i < participants.length; i++) {
      for (let j = i + 1; j < participants.length; j++) {
        const player1 = participants[i];
        const player2 = participants[j];

        if (!player1 || !player2) return groupPairs;

        allPossiblePairs.push([player1, player2]);
      }
    }

    groupPairs.set(group, allPossiblePairs);
  }

  return groupPairs;
};

export default createAllPossiblePairsInGroup;

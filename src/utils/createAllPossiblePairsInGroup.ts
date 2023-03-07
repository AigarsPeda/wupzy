import type { ParticipantsType } from "types/team.types";
import sortParticipantsByGroup from "utils/sortParticipantsByGroup";

const createAllPossiblePairsInGroup = (teams: ParticipantsType[]) => {
  const sorted = sortParticipantsByGroup(teams);
  const groupPairs = new Map<string, ParticipantsType[][]>([]);

  for (const group of sorted.keys()) {
    const teams = sorted.get(group);

    if (!teams) return groupPairs;

    const allPossiblePairs: ParticipantsType[][] = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const player1 = teams[i];
        const player2 = teams[j];

        if (!player1 || !player2) return groupPairs;

        allPossiblePairs.push([player1, player2]);
      }

      groupPairs.set(group, allPossiblePairs);
    }
  }

  return groupPairs;
};

export default createAllPossiblePairsInGroup;

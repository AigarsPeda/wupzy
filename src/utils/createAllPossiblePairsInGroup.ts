import type { TeamType } from "types/team.types";
import sortTeamsByGroup from "utils/sortTeamsByGroup";

const createAllPossiblePairsInGroup = (teams: TeamType[]) => {
  const sorted = sortTeamsByGroup(teams);
  const groupPairs = new Map<string, TeamType[][]>([]);

  for (const group of sorted.keys()) {
    const teams = sorted.get(group);

    if (!teams) return groupPairs;

    const allPossiblePairs: TeamType[][] = [];

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

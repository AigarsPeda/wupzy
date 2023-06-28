import { type Team } from "@prisma/client";

const splitTeamsInGroups = (teams: Team[]) => {
  const groups = new Set<string>();
  const playersByGroup = new Map<string, Team[]>();

  for (const team of teams) {
    const playersInGroup = playersByGroup.get(team.group);

    if (playersInGroup) {
      playersInGroup.push(team);
      continue;
    }

    if (team.group) {
      playersByGroup.set(team.group, [team]);
      groups.add(team.group);
    }
  }

  return { groups: Array.from(groups), playersByGroup };
};

export default splitTeamsInGroups;

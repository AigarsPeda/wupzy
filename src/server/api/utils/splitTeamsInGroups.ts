import { type Team } from "@prisma/client";

const splitTeamsInGroups = (teams: Team[]) => {
  const playersByGroup = new Map<string, Team[]>();

  for (const team of teams) {
    const playersInGroup = playersByGroup.get(team.group);

    if (playersInGroup) {
      playersInGroup.push(team);
      continue;
    }

    if (team.group) {
      playersByGroup.set(team.group, [team]);
    }
  }

  return playersByGroup;
};

export default splitTeamsInGroups;

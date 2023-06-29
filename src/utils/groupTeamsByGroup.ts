import { type TeamType } from "~/types/tournament.types";

const groupTeamsByGroup = (teams: TeamType[]) => {
  const groups = new Set<string>();
  const teamsByGroup = new Map<string, TeamType[]>();

  for (const team of teams) {
    const teamsInGroup = teamsByGroup.get(team.group);

    if (teamsInGroup) {
      teamsInGroup.push(team);
      continue;
    }

    if (team.group) {
      teamsByGroup.set(team.group, [team]);
      groups.add(team.group);
    }
  }
  return { teamsByGroup, groups: [...groups] };
};

export default groupTeamsByGroup;

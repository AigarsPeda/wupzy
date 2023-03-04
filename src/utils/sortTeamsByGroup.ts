import type { TeamType } from "types/team.types";

const sortTeamsByGroup = (teams: TeamType[]) => {
  const teamsByGroup = new Map<string, TeamType[]>();

  teams.forEach((team) => {
    const group = team.group;
    const teamsInGroup = teamsByGroup.get(group);

    if (teamsInGroup) {
      teamsInGroup.push(team);
      return;
    }

    teamsByGroup.set(group, [team]);
  });

  // sort map keys alphabetically

  const sortedAsc = new Map([...teamsByGroup].sort());

  return sortedAsc;
};

export default sortTeamsByGroup;

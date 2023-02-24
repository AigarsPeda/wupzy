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

  return teamsByGroup;
};

export default sortTeamsByGroup;

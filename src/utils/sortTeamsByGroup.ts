import type { Team } from "@prisma/client";

const sortTeamsByGroup = (teams: Team[]) => {
  const teamsByGroup = new Map<string, Team[]>();

  teams.forEach((team) => {
    const group = team.group as string;
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

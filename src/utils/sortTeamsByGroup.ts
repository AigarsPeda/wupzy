import type { Team } from "@prisma/client";

const sortTeamsByGroup = (teams: Team[]) => {
  const teamsByGroup = teams.reduce((acc, team) => {
    const group = team.group as string;

    if (!acc[group]) {
      acc[group] = [];
    }

    acc[group]?.push(team);

    return acc;
  }, {} as Record<string, Team[]>);

  return teamsByGroup;
};

export default sortTeamsByGroup;

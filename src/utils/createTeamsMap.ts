import type { TeamType } from "types/team.types";

const createTeamsMap = (teams: TeamType[] | undefined) => {
  const teamsMap = new Map<string, TeamType[]>();

  if (!teams) return { teamsMap };

  teams.forEach((team) => {
    const teamsInGroup = teamsMap.get(team.group);

    if (teamsInGroup) {
      teamsInGroup.push(team);
      return;
    }

    teamsMap.set(team.group, [team]);
  });

  const teamsKey = [...teamsMap.keys()];

  return { teamsMap, teamsKey };
};

export default createTeamsMap;

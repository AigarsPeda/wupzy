import type { TeamType } from "types/team.types";

const createTeamsMap = (teams: TeamType[] | undefined) => {
  const teamsMap = new Map<string, TeamType[]>();

  if (!teams) return teamsMap;

  teams.forEach((team) => {
    const teamsInGroup = teamsMap.get(team.group);

    if (teamsInGroup) {
      // const teamsInGroup = teamsMap.get(team.group);
      teamsInGroup.push(team);
      // teamsMap.set(team.group, teamsInGroup);

      return;
    }

    teamsMap.set(team.group, [team]);
  });

  return teamsMap;
};

export default createTeamsMap;

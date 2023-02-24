import type { TeamsByGroupType } from "types/team.types";

export const getKeys = (teamsMap: TeamsByGroupType) => {
  return [...teamsMap.keys()];
};

export const getAvailableGroups = (group: string, teams: TeamsByGroupType) => {
  return getKeys(teams).filter((f) => f !== group);
};

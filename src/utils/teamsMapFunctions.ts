import type { TeamsMapType } from "types/team.types";

export const getKeys = (teamsMap: TeamsMapType) => {
  return [...teamsMap.keys()];
};

export const getAvailableGroups = (group: string, teams: TeamsMapType) => {
  return getKeys(teams).filter((f) => f !== group);
};

import type { ParticipantMapType } from "types/team.types";

export const getKeys = (teamsMap: ParticipantMapType) => {
  return [...teamsMap.keys()];
};

export const getAvailableGroups = (
  group: string,
  teams: ParticipantMapType
) => {
  return getKeys(teams).filter((f) => f !== group);
};

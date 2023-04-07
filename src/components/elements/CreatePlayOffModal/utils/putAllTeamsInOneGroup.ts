import { ALL } from "hardcoded";
import type { TeamsMapType, TeamType } from "types/team.types";

const putAllTeamsInOneGroup = (map: TeamsMapType) => {
  const allTeams = Array.from(map.values()).flat();

  const newMap = new Map<string, TeamType[]>();
  newMap.set(ALL, allTeams);

  return newMap;
};

export default putAllTeamsInOneGroup;

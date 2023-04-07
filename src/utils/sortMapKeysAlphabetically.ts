import type { TeamType, TeamsMapType } from "types/team.types";

const sortMapKeysAlphabetically = (map: TeamsMapType) => {
  const sortedMap = new Map<string, TeamType[]>();
  const sortedKeys = Array.from(map.keys()).sort();

  sortedKeys.forEach((key) => {
    const teams = map.get(key);
    if (teams) sortedMap.set(key, teams);
  });

  return sortedMap;
};

export default sortMapKeysAlphabetically;

import type { ParticipantMapType } from "../types/team.types";
import { getKeys } from "./teamsMapFunctions";

const compareMaps = (map1: ParticipantMapType, map2: ParticipantMapType) => {
  const map1Keys = getKeys(map1);
  const map2Keys = getKeys(map2);

  if (map1Keys.length !== map2Keys.length) {
    return false;
  }

  for (const key of map1Keys) {
    if (map1.get(key)?.length !== map2.get(key)?.length) {
      return false;
    }

    for (const team of map1.get(key) || []) {
      if (!map2.get(key)?.find((t) => t.id === team.id)) {
        return false;
      }
    }
  }

  return true;
};

export default compareMaps;

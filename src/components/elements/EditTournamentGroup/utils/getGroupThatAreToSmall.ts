import { DEFAULT_ATTENDANTS_COUNT } from "hardcoded";
import type { TeamsMapType } from "types/team.types";

const getGroupThatAreToSmall = (teams: TeamsMapType) => {
  const groupToSmall: string[] = [];

  teams.forEach((teams, group) => {
    if (teams.length !== 0 && teams.length < DEFAULT_ATTENDANTS_COUNT) {
      groupToSmall.push(group);
    }
  });

  return groupToSmall;
};

export default getGroupThatAreToSmall;

import { DEFAULT_ATTENDANTS_COUNT } from "hardcoded";
import type { ParticipantMapType } from "types/team.types";

const getGroupThatAreToSmall = (teams: ParticipantMapType) => {
  const groupToSmall: string[] = [];

  teams.forEach((teams, group) => {
    if (teams.length !== 0 && teams.length < DEFAULT_ATTENDANTS_COUNT) {
      groupToSmall.push(group);
    }
  });

  return groupToSmall;
};

export default getGroupThatAreToSmall;

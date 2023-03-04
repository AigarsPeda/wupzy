import type { TeamType } from "types/team.types";

const containsParticipants = (obj: TeamType, list: TeamType[]) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i]?.id === obj.id) {
      return true;
    }
  }

  return false;
};

export default containsParticipants;

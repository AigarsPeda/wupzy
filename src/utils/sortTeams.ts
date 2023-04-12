import type { TeamType } from "types/team.types";

const sortTeams = (teams: TeamType[]) => {
  const sortedTeams = teams.sort((a, b) => {
    if (a.points > b.points) {
      return -1;
    }
    if (a.points < b.points) {
      return 1;
    }

    if (a.points === b.points) {
      if (a.smallPoints > b.smallPoints) {
        return -1;
      }
      if (a.smallPoints < b.smallPoints) {
        return 1;
      }
    }

    return 0;
  });

  return sortedTeams;
};

export default sortTeams;

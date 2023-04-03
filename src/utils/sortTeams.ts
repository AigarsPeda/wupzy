import type { TeamType } from "types/team.types";

const sortTeams = (teams: TeamType[], property: "points" | "smallPoints") => {
  const sortedTeams = teams.sort((a, b) => {
    if (a[property] > b[property]) {
      return -1;
    }
    if (a[property] < b[property]) {
      return 1;
    }
    return 0;
  });

  return sortedTeams;
};

export default sortTeams;

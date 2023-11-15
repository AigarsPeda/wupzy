import { type NewTeamsType } from "~/types/tournament.types";

const filteredTeams = (teams: NewTeamsType[]) => {
  // remove teams with empty names and remove players with empty names
  const filtered = teams
    .filter((team) => team.name?.trim() !== "")
    .map((team) => ({
      ...team,
      players: team.players.filter((player) => player.name.trim() !== ""),
    }));

  return filtered;
};

export default filteredTeams;

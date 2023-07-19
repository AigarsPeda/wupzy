import { type NewTournamentType } from "~/types/tournament.types";

const filteredTeams = (input: NewTournamentType) => {
  // remove teams with empty names and remove players with empty names
  const filtered = input.teams
    .filter((team) => team.name?.trim() !== "")
    .map((team) => ({
      ...team,
      players: team.players.filter((player) => player.name.trim() !== ""),
    }));

  return filtered;
};

export default filteredTeams;

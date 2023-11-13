import {
  NewPlayerType,
  type NewTournamentType,
} from "~/types/tournament.types";

const filterPlayers = (players: NewPlayerType[]) => {
  const filtered = players.filter((player) => player.name.trim() !== "");

  return filtered;
};

export default filterPlayers;

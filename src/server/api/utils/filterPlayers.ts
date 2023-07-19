import { type NewTournamentType } from "~/types/tournament.types";

const filterPlayers = (input: NewTournamentType) => {
  const filtered = input.king.players.filter(
    (player) => player.name.trim() !== ""
  );

  return filtered;
};

export default filterPlayers;

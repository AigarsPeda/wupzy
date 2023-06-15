import { type Player, type Team } from "@prisma/client";
import createKingGames from "~/server/api/utils/createKingGames";

const createKingGamesNTimes = (
  teams: (Team & {
    players: Player[];
  })[],
  tournamentId: string,
  times: number
) => {
  const result = [];
  for (let i = 0; i < times; i++) {
    result.push(...createKingGames(teams, tournamentId, i + 1));
  }
  return result;
};

export default createKingGamesNTimes;

import { type Team } from "@prisma/client";
import createGames from "~/server/api/utils/createGames";

const createGamesNTimes = (
  teams: Team[],
  tournamentId: string,
  times: number
) => {
  const result = [];
  for (let i = 0; i < times; i++) {
    result.push(...createGames(teams, tournamentId, i + 1));
  }
  return result;
};

export default createGamesNTimes;

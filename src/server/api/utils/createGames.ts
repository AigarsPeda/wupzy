import { type TeamType } from "~/types/tournament.types";

const createGames = (teams: TeamType[]) => {
  const games = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const teamOneId = teams[i]?.id;
      const teamTwoId = teams[j]?.id;

      if (teamOneId && teamTwoId) {
        games.push({
          teamOneId,
          teamTwoId,
        });
      }
    }
  }

  return games;
};

export default createGames;

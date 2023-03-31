type GameType = {
  first: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
  second: {
    teamId: string;
    participants: {
      id: string;
    }[];
  };
};

const filterAllPossibleTeamsGames = (teamId: string, games: GameType[]) => {
  const filteredGames = games.filter((game) => {
    const firstTeamId = game.first.teamId;
    const secondTeamId = game.second.teamId;

    return firstTeamId === teamId || secondTeamId === teamId;
  });

  return filteredGames;
};

export default filterAllPossibleTeamsGames;

const getPoints = (team1Score: number, team2Score: number) => {
  if (team1Score > team2Score) {
    return {
      team1Points: 3,
      team2Points: 0,
    };
  }

  if (team1Score < team2Score) {
    return {
      team1Points: 0,
      team2Points: 3,
    };
  }

  return {
    team1Points: 1,
    team2Points: 1,
  };
};

export default getPoints;

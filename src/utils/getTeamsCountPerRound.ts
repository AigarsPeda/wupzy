const getTeamsCountPerRound = (num: number) => {
  return Math.pow(2, num) * 2;
};

export default getTeamsCountPerRound;

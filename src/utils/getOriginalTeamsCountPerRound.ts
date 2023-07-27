const getOriginalTeamsCountPerRound = (num: number) => {
  // Calculate the round value using Math.pow(2, round) * 2 formula
  const round = Math.round(Math.log2(num / 2));
  const y = Math.pow(2, round) * 2;
  return y;
};

export default getOriginalTeamsCountPerRound;

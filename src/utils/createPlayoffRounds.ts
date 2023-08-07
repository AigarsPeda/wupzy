import countDivisionsByTwo from "~/utils/countDivisionsByTwo";

const createPlayoffRounds = (length: number) => {
  let rounds = countDivisionsByTwo(length);

  if (rounds % 2 !== 0) {
    rounds--;
  }

  if (rounds === 0) {
    rounds = 1;
  }

  const playoffRounds = Array.from({ length: rounds }, (_, i) => i + 1);

  const largestPossibleTeams = playoffRounds[playoffRounds.length - 1] || 0;

  return { playoffRounds, largestPossibleTeams };
};

export default createPlayoffRounds;

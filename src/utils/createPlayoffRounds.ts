import countDivisionsByTwo from "~/utils/countDivisionsByTwo";

const createPlayoffRounds = (length: number) => {
  let rounds = countDivisionsByTwo(length);

  if (rounds % 2 !== 0) {
    rounds--;
  }

  if (rounds >= 4) {
    rounds = 3;
  }

  const playoffRounds = Array.from({ length: rounds }, (_, i) => i + 1);

  return playoffRounds;
};

export default createPlayoffRounds;

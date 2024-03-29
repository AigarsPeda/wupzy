import countDivisionsByTwo from "~/utils/countDivisionsByTwo";

const createPlayoffRounds = (length: number) => {
  const evenLength = length % 2 === 0 ? length : length + 1;
  let rounds = countDivisionsByTwo(evenLength);

  if (rounds % 2 !== 0) {
    rounds++;
  }

  const playoffRounds = Array.from({ length: rounds }, (_, i) => {
    return i + 1;
  });

  // create playoff rounds array that starts from 2
  // const playoffRounds = Array.from({ length: rounds - 1 }, (_, i) => {
  //   return i + 2;
  // });

  const largestPossibleTeams = playoffRounds[playoffRounds.length - 1] || 0;

  return { playoffRounds, largestPossibleTeams };
};

export default createPlayoffRounds;

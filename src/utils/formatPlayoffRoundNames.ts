const formatPlayoffRoundNames = (round: number) => {
  switch (round) {
    case 16:
      return "Round of 16";

    case 8:
      return "Quarter finals";

    case 4:
      return "Semi finals";

    case 2:
      return "Finals";

    default:
      return `Round of ${round}`;
  }
};

export default formatPlayoffRoundNames;

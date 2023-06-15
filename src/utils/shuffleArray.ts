// fisherYatesShuffle
const shuffleArray = <T>(array: (T | undefined)[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  // this is needed because of possibility undefined values in the array
  return array.filter((x): x is T => x !== undefined);
};

export default shuffleArray;

const createAllPossibleOddNumberArray = (count: number, step: number) => {
  const arr = [];

  for (let i = 0; i <= count; i += step) {
    if (i === 0) continue;

    arr.push(i);
  }
  return arr;
};

export default createAllPossibleOddNumberArray;

const createAllPossibleOddNumberArray = (count: number) => {
  const arr = [];
  for (let i = 0; i <= count; i += 2) {
    if (i === 0) continue;

    arr.push(i);
  }
  return arr;
};

export default createAllPossibleOddNumberArray;

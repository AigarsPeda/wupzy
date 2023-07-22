const countDivisionsByTwo = (number: number) => {
  let count = 0;
  while (number >= 2) {
    number = number / 2;
    count++;
  }
  return count;
};

export default countDivisionsByTwo;

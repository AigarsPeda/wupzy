import isOdd from "./isOdd";

const getNextOddNumber = (number: number): number => {
  if (isOdd(number)) return number;

  return number + 1;
};

export default getNextOddNumber;

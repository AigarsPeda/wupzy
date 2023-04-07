import isOdd from "utils/isOdd";

const getFirstOddNumber = (num: number) => {
  if (isOdd(num)) return num;

  return num + 1;
};

export default getFirstOddNumber;
